import { AutoColumn } from 'components/Column'
import { HideSmall, TYPE } from 'theme'
import { TitleRow } from '.'
import { Table } from 'components/Table'
import { useQuery } from '@apollo/client'
import { tradingClient } from 'lib/thegraph'
import { GET_ALL_POOLS, AllPairs, Pair } from 'lib/thegraph/gql/pool'
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

const InteractiveTR = styled.tr`
  &:hover {
    background: #201e2b !important;
  }
`

export default function AllPools() {
  const { loading, error, data } = useQuery<AllPairs>(GET_ALL_POOLS, {
    client: tradingClient,
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })

  return (
    <AutoColumn gap="md" style={{ width: '100%' }}>
      <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
        <HideSmall>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>All Pools</TYPE.mediumHeader>
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
            <th>TVL</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <Loader />
          ) : error ? (
            <>Err: {error.message}</>
          ) : (
            data?.pairs.map((p, i) => <PairRow key={p.id} index={i} pair={p} />)
          )}
        </tbody>
      </Table>
    </AutoColumn>
  )
}

function PairRow({ pair, index }: { pair: Pair; index: number }) {
  const history = useHistory()

  const currency0 = useCurrency(pair.token0.id)
  const currency1 = useCurrency(pair.token1.id)

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
      <td>{dayVolumeReference == pair.day ? formatToFixed(pair.dailyVolumeUSD) : 0}</td>
      <td>{weekVolumeReference == pair.week ? formatToFixed(pair.weeklyVolumeUSD) : 0}</td>
      <td>-</td>
      <td>{formatToFixed(pair.reserveUSD, 4)}</td>
    </InteractiveTR>
  )
}
