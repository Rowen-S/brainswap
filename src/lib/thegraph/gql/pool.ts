import { gql } from '@apollo/client'

interface Pair {
  id: string
  token0: {
    id: string
  }
  token1: {
    id: string
  }
  reserve0: string
  reserve1: string
  totalSupply: string
  reserveETH: string
  reserveUSD: string
  trackedReserveETH: string
  token0Price: string
  token1Price: string
  volumeToken0: string
  volumeToken1: string
  volumeUSD: string
  untrackedVolumeUSD: string
}

export interface AllPairs {
  pairs: Pair[]
}
export const GET_ALL_POOLS = gql`
  query AllPools {
    pairs(orderBy: totalSupply) {
      id
      token0 {
        id
      }
      token1 {
        id
      }
      reserveUSD
      reserveETH
    }
  }
`
