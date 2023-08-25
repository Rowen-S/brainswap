import { gql } from '@apollo/client'

export interface PowerProps {
  lpinfos: [{ power: string }]
  userMiningInfos: [{ power: string }]
}
export const GET_LP_TRAD_POWER = gql`
  query AllTradandlp($user: String!) {
    lpinfos(where: { user: $user }) {
      id
      user
      power
      liquidity
      liquidityStart
      amountTotalUSD
      epoch
    }
    userMiningInfos(where: { user: $user }) {
      id
      epoch
      user
      power
    }
  }
`
