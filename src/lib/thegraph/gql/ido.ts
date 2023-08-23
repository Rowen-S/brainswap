import { gql } from '@apollo/client'

export const GET_IDOHISTORYS = gql`
  query AllIDOHistory($user: String!) {
    actions(where: { user: $user }, orderBy: timestamp) {
      transactionHash
      id
      user
      amount
      timestamp
    }
  }
`
