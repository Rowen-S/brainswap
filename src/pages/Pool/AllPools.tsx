import { AutoColumn } from 'components/Column'
import { HideSmall, TYPE } from 'theme'
import { TitleRow } from '.'
import { Table } from 'components/Table'
import { useQuery } from '@apollo/client'
import { tradingClient } from 'lib/thegraph'
import { GET_ALL_POOLS, AllPairs } from 'lib/thegraph/gql/pool'

export default function AllPools() {
  const { loading, error, data } = useQuery<AllPairs>(GET_ALL_POOLS, {
    client: tradingClient,
    fetchPolicy: 'network-only',
    pollInterval: 1000 * 10,
    notifyOnNetworkStatusChange: true,
  })

  console.log(loading, error, data)

  return (
    <AutoColumn gap="md" style={{ width: '100%' }}>
      <TitleRow style={{ marginTop: '1rem' }} padding={'0'}>
        <HideSmall>
          <TYPE.mediumHeader style={{ marginTop: '0.5rem', justifySelf: 'flex-start' }}>
            Rewards pools
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
            <th>Trading Boost</th>
          </tr>
        </thead>
        <tbody>
          {data?.pairs.map((p) => (
            <tr key={p.id}>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </AutoColumn>
  )
}
