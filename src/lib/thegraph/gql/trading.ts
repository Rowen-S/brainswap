import { gql } from '@apollo/client'

export interface PowerProps {
  lpinfos: [{ power: string; liquidityStart: string; amountTotalUSD: string }]
  userMiningInfos: [{ power: string }]
}
export const GET_LP_TRAD_POWER = gql`
  query AllTradandlp($user: String!, $epoch: Int) {
    lpinfos(where: { user: $user, epoch: $epoch }) {
      id
      user
      power
      liquidity
      liquidityStart
      amountTotalUSD
      epoch
    }
    userMiningInfos(where: { user: $user, epoch: $epoch }) {
      id
      epoch
      user
      power
    }
  }
`

export const GET_MIN_INFOS = gql`
  query {
    userMiningInfos(orderBy: power, first: 3, orderDirection: desc) {
      id
      epoch
      user
      power
      volumeUSD
    }
  }
`
export const GET_MINING_INFO = gql`
  query GetMiningInfo($epoch: String!) {
    miningInfo(id: $epoch) {
      id
      power
    }
  }
`
