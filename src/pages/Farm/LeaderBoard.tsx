import { StairCard } from 'components/StairCard'
import React from 'react'
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
import { ExternalLink } from 'theme'
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
export default function Leaderboard({ epoch }: { epoch: number | undefined }) {
  const { chainId } = useWeb3React()
  const { data } = useQuery<{
    userMiningInfos: [
      {
        power: string
        id: string
        epoch: string
        user: string
        volumeUSD: string
      }
    ]
  }>(GET_MIN_INFOS, {
    client: tradingClient,
  })

  return (
    <>
      <Text fontSize={28}>Genesis Epoch Trading Leaderboard</Text>
      <Text fontSize={14} mt={20} opacity={0.5}>
        Get to the top of the leaderboard in GENESIS EPOCH to determine your NEXT EPOCH trading boost
      </Text>

      <StairCard bg={StairBgImage}>
        <Table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Trading Boost</th>
              <th>Volume</th>
              <th>Trading PTS</th>
              <th>Estimated rewards</th>
              <th>Sacrifice</th>
            </tr>
          </thead>
          <tbody>
            {data?.userMiningInfos.length ? (
              data?.userMiningInfos.map((x, i) => (
                <tr key={x.id}>
                  <td>
                    <Image src={i === 0 ? Rank0Image : i === 1 ? Rank1Image : Rank2Image} />
                  </td>
                  <td>
                    <ExternalLink href={getExplorerLink(chainId ?? 80001, x.user, ExplorerDataType.ADDRESS)}>
                      {shortenAddress(x.user)}
                    </ExternalLink>
                  </td>
                  <td>
                    <TradingBoost>x 1.0</TradingBoost>
                  </td>
                  <td>{formatToFixed(x.volumeUSD)}</td>
                  <td>-</td>
                  <td>{epoch && <EstimatedRewards epoch={epoch} power={x.power} />}</td>
                  <td>
                    <Sacrifice>Comming soom</Sacrifice>
                  </td>
                </tr>
              ))
            ) : (
              <Loader />
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
