import { Table } from 'components/Table'
import { useQuery } from '@apollo/client'
import Loader from 'components/Loader'
import { formatEther } from 'ethers/lib/utils'
import { ExternalLink } from 'theme'
import { ExplorerDataType, getExplorerLink } from 'utils/getExplorerLink'
import { useWeb3React } from '@web3-react/core'
import { formatLuxonDateTime, shortenString } from 'utils'
import { idoClient } from 'lib/thegraph'
import { GET_IDOHISTORYS } from 'lib/thegraph/gql/ido'

interface History {
  transactionHash: string
  id: string
  user: string
  amount: string
  timestamp: string
}
export default function LPHistory() {
  const { chainId, account } = useWeb3React()

  const { loading, error, data } = useQuery(GET_IDOHISTORYS, {
    client: idoClient,
    variables: { user: account },
  })

  return (
    <Table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Type</th>
          <th>Hash</th>
          <th>Amount</th>
          <th>Status</th>
          <th>Time</th>
        </tr>
      </thead>
      <tbody>
        {loading && <Loader />}
        {!chainId ? (
          <></>
        ) : error ? (
          <>Error.</>
        ) : (
          data?.actions.map((x: History, i: number) => (
            <tr key={x?.id}>
              <td>{i + 1}</td>
              <td>buy</td>
              <td>
                <ExternalLink href={getExplorerLink(chainId, x.transactionHash, ExplorerDataType.TRANSACTION)}>
                  {shortenString(x.transactionHash)}
                </ExternalLink>
              </td>
              <td>{x.amount ? formatEther(x.amount) : '-'}</td>
              <td>Confirmed</td>
              <td>{x.timestamp ? formatLuxonDateTime(x.timestamp) : '-'}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}
