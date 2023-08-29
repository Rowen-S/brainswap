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
export const GET_VESINGS = gql`
  query allVesings($user: String!) {
    redeems(where: { user: $user }) {
      id
      iqAmount
      ESIQAmount
      duration
      timestamp
    }
  }
`
