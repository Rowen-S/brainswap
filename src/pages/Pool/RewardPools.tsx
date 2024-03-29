import { AutoColumn } from 'components/Column'
import { HideSmall, TYPE } from 'theme'
import { TitleRow } from '.'
import { Table } from 'components/Table'
import { useQuery } from '@apollo/client'
import { tradingClient } from 'lib/thegraph'
import { GET_REWARD_POOLS, RewardPairs, RewardPair } from 'lib/thegraph/gql/pool'
import DoubleCurrencyLogo from 'components/DoubleLogo'
import { useCurrency } from 'hooks/Tokens'
import { AutoRow } from 'components/Row'
import { Dots } from './styleds'

import Rank1Image from '../../assets/images/rank_0.svg'
import Rank2Image from '../../assets/images/rank_1.svg'
import Rank3Image from '../../assets/images/rank_2.svg'
import { DateTime } from 'luxon'
import { formatToFixed } from 'utils'
import Loader from 'components/Loader'
import { useHistory } from 'react-router-dom'
import { currencyId } from 'utils/currencyId'
import styled from 'styled-components'
import { useMemo } from 'react'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import { towWeek, tradStartTime } from 'constants/misc'

const InteractiveTR = styled.tr`
  &:hover {
    background: #201e2b !important;
  }
`

const BoostWrapper = styled.div`
  width: fit-content;
  padding: 6px 20px;
  border: 1px dashed ${({ theme }) => theme.bg6};
  border-radius: 2px;
  margin: 0px auto;
`

export default function RewardPools() {
  const blockTimestamp = useCurrentBlockTimestamp()
  const epoch = useMemo(() => {
    if (blockTimestamp && tradStartTime) {
      return Math.ceil((blockTimestamp.toNumber() - tradStartTime) / towWeek)
    }
    return
  }, [blockTimestamp])

  const { loading, error, data } = useQuery<RewardPairs>(GET_REWARD_POOLS, {
    client: tradingClient,
    variables: { epoch: epoch ? String(epoch - 1) : epoch },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  return (
    <AutoColumn gap="md" style={{ width: '100%' }}>
      <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
        <HideSmall>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }} color={'text1'}>
            Rewards Pools
          </TYPE.mediumHeader>
        </HideSmall>
      </TitleRow>

      <Table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>MEME Pool</th>
            <th>Fee</th>
            <th>Volume 24H</th>
            <th>Volume 7D</th>
            <th>APR 24h</th>
            <th>Pair Boost</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <TYPE.error error>Err: {error.message}</TYPE.error>
          ) : (
            data?.miningPairs.map((r, i) => <PairRow key={r.id} index={i} reward={r} />)
          )}
        </tbody>
      </Table>
    </AutoColumn>
  )
}

function PairRow({ reward, index }: { reward: RewardPair; index: number }) {
  const history = useHistory()

  const currency0 = useCurrency(reward.pair.token0.id)
  const currency1 = useCurrency(reward.pair.token1.id)

  const secondsInDay = 24 * 60 * 60
  const dayVolumeReference = Math.floor(DateTime.now().toSeconds()) / secondsInDay

  const secondsInWeek = secondsInDay * 7
  const weekVolumeReference = Math.floor(DateTime.now().toSeconds()) / secondsInWeek

  return (
    <InteractiveTR
      onClick={() => currency0 && currency1 && history.push(`/add/${currencyId(currency0)}/${currencyId(currency1)}`)}
      style={{
        cursor: 'pointer',
      }}
    >
      <td>
        {index < 3 ? (
          <img
            src={index == 0 ? Rank1Image : index == 1 ? Rank2Image : index == 2 ? Rank3Image : Rank3Image}
            alt="rank"
          />
        ) : (
          index + 1
        )}
      </td>
      <td>
        <AutoRow gap="8px" style={{ marginLeft: '10px' }}>
          {currency0 && currency1 && <DoubleCurrencyLogo currency0={currency0} currency1={currency1} size={20} />}
          <TYPE.body fontWeight={500} fontSize={20}>
            {!currency0 || !currency1 ? <Dots>Loading</Dots> : `${currency0.symbol}/${currency1.symbol}`}
          </TYPE.body>
        </AutoRow>
      </td>
      <td>0.3%</td>
      <td>{dayVolumeReference == reward.pair.day ? formatToFixed(reward.pair.dailyVolumeUSD) : 0}</td>
      <td>{weekVolumeReference == reward.pair.week ? formatToFixed(reward.pair.weeklyVolumeUSD) : 0}</td>
      <td>-</td>
      <td>
        <BoostWrapper>{reward.weight ? `x ${reward.weight / 100}` : '-'}</BoostWrapper>
      </td>
    </InteractiveTR>
  )
}
