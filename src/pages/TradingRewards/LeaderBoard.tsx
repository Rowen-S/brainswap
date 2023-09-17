import { StairCard } from 'components/StairCard'
import { useMemo } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Image, Text } from 'rebass'
import { Table } from 'components/Table'
import styled from 'styled-components'

import Rank0Image from '../../assets/images/rank_0.svg'
import Rank1Image from '../../assets/images/rank_1.svg'
import Rank2Image from '../../assets/images/rank_2.svg'
import Pagination from 'components/Pagination'
import { tradingClient } from 'lib/thegraph'
import { GET_MINING_INFO, GET_MIN_INFOS } from 'lib/thegraph/gql/trading'
import { useQuery } from '@apollo/client'
import { formatToFixed, shortenAddress } from 'utils'
import Loader from 'components/Loader'
import { rewardsPool } from 'constants/misc'
import { ExternalLink, TYPE } from 'theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { useWeb3React } from '@web3-react/core'

const TradingBoost = styled.span`
  border: 1px dashed #2cfff3;
  line-height: 25px;
  border-radius: 2px;
  padding: 5px 15px;
  color: #2cfff3;
`
const Sacrifice = styled.span`
  color: #2cfff3;
  font-size: 12px;
  line-height: 12px;
`
interface MiningInfo {
  power: string
  id: string
  epoch: string
  user: string
  volumeUSD: string
  rank: number
}
export default function Leaderboard({ epoch }: { epoch: number | undefined }) {
  const { chainId, account } = useWeb3React()
  const { loading, error, data } = useQuery<{
    userMiningInfos: MiningInfo[]
  }>(GET_MIN_INFOS, {
    client: tradingClient,
    variables: { user: account, epoch: epoch ? epoch - 1 : epoch },
  })

  const boardList = useMemo(() => {
    if (data && data?.userMiningInfos && data?.userMiningInfos.length) {
      const d: MiningInfo[] = data.userMiningInfos.slice()

      if (account) {
        const myIndex = d.findIndex((x) => x.user.toLocaleLowerCase() === account.toLocaleLowerCase())
        if (myIndex >= 0) {
          const dataWithRank = d.map((item, index) => {
            return {
              ...item,
              rank: index + 1,
            }
          })
          const myVote = dataWithRank[myIndex]
          dataWithRank.splice(myIndex, 1)
          dataWithRank.unshift(myVote)
          return dataWithRank
        } else {
          console.log('0099---')
          const dataWithRank = d.map((item, index) => {
            return {
              ...item,
              rank: index + 1,
            }
          })
          console.log(dataWithRank)
          return dataWithRank
        }
      }
      return d.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        }
      })
    }
    return null
  }, [data, account])

  return (
    <>
      <Text fontSize={28} textAlign="center" mt={30}>
        Genesis Epoch (
        <span
          style={{
            color: '#2CFFF3',
          }}
        >
          {epoch ?? '-'}
        </span>
        ) Trading Leaderboard
      </Text>
      <Text fontSize={14} mt={20} opacity={0.5} textAlign="center">
        Get to the top of the leaderboard to boost your power. The top 100 trading volume on the epoch determines your
        rank and NEXT EPOCH boost!
      </Text>

      <StairCard bg={StairBgImage}>
        <Table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Trading Boost</th>
              <th>Volume</th>
              <th>Trading Power</th>
              <th>Estimated rewards</th>
              <th>Red bull</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <Loader />
            ) : error ? (
              <TYPE.error error>Err: {error.message} </TYPE.error>
            ) : (
              boardList &&
              boardList.map((x) => (
                <tr key={x.rank}>
                  <td>
                    {/* {account && account.toLocaleLowerCase() == x.user.toLocaleLowerCase() ? (
                      i === 0 ? (
                        x.rank
                      ) : (
                        <Image src={i === 1 ? Rank0Image : i === 2 ? Rank1Image : Rank2Image} />
                      )
                    ) : (
                      <Image src={i === 0 ? Rank0Image : i === 1 ? Rank1Image : Rank2Image} />
                    )} */}
                    {x.rank === 1 || x.rank === 2 || x.rank === 3 ? (
                      <Image src={x.rank === 1 ? Rank0Image : x.rank === 2 ? Rank1Image : Rank2Image} />
                    ) : (
                      x.rank
                    )}
                  </td>
                  <td>
                    {x.user && (
                      <ExternalLink href={getExplorerLink(chainId ?? 80001, x.user, ExplorerDataType.ADDRESS)}>
                        {account && x.user.toLocaleLowerCase() === account.toLocaleLowerCase()
                          ? 'You'
                          : shortenAddress(x.user)}
                      </ExternalLink>
                    )}
                  </td>
                  <td>
                    <TradingBoost>x 1.0</TradingBoost>
                  </td>
                  <td>{x.volumeUSD && formatToFixed(x.volumeUSD)}</td>
                  <td>-</td>
                  <td>{epoch && x.power && <EstimatedRewards epoch={epoch} power={x.power} />}</td>
                  <td>
                    <Sacrifice>Coming soon</Sacrifice>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </StairCard>

      <Pagination total={101} pageSize={50}></Pagination>
    </>
  )
}

function EstimatedRewards({ epoch, power }: { epoch: number; power: string }) {
  const { loading, error, data } = useQuery(GET_MINING_INFO, {
    client: tradingClient,
    variables: { epoch: epoch - 1 + '' },
  })

  let content
  if (loading) {
    content = <Loader />
  }
  if (data && data.miningInfo) {
    content = <div>{formatToFixed((parseFloat(power) / parseFloat(data.miningInfo.power)) * rewardsPool)}</div>
  }
  if (error) {
    content = '-'
  }
  return <>{content}</>
}
