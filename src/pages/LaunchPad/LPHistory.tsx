import { Table } from 'components/Table'
import { gql, useQuery } from '@apollo/client'
import Loader from 'components/Loader'

const GET_IDOHISTORYS = gql`
  query {
    actions(first: 5) {
      transactionHash
      id
      user
      amount
      timestamp
    }
  }
`

interface History {
  transactionHash: string
  id: string
  user: string
  amount: string
  timestamp: string
}
export default function LPHistory() {
  const { loading, error, data } = useQuery(GET_IDOHISTORYS, {
    variables: { language: 'english' },
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
        {error ? (
          <>Error.</>
        ) : (
          data?.actions.map((x: History, i: number) => (
            <tr key={x?.id}>
              <td>{i}</td>
              <td>1223</td>
              <td>{x.transactionHash}</td>
              <td>{x.amount}</td>
              <td>confirm</td>
              <td>{x.timestamp}</td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  )
}
