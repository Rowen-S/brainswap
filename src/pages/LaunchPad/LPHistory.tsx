import { Table } from 'components/Table'
import { gql, useQuery } from '@apollo/client'

const GET_IDOHISTORYS = gql`
  query {
    actions(first: 5) {
      transactionHash
      id
      user
      amount
    }
  }
`

interface History {
  transactionHash: string
  id: string
  user: string
  amount: string
}
export default function LPHistory() {
  const {
    loading,
    error,
    data: { actions },
  } = useQuery(GET_IDOHISTORYS, {
    variables: { language: 'english' },
  })

  console.log('LPHistory:', loading, error, actions)

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
        {actions?.map((x: History) => (
          <tr key={x?.id}>
            <td>2123</td>
            <td>1223</td>
            <td>asdasd</td>
            <td>asdasd</td>
            <td>asdasd</td>
            <td>asdasd</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
