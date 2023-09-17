import { gql } from '@apollo/client'

export interface Pair {
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
  dailyVolumeUSD: string
  weeklyVolumeUSD: string
  day: number
  week: number
}

export interface AllPairs {
  pairs: Pair[]
}

export interface RewardPair {
  id: string
  epoch: {
    id: string
  }
  rank: number
  pair: Pair
  weight: number
  lpmining: boolean
  volumeUSD: string
}

export interface RewardPairs {
  miningPairs: RewardPair[]
}
export const GET_ALL_POOLS = gql`
  query AllPools {
    pairs(orderBy: reserveUSD) {
      id
      token0 {
        id
      }
      token1 {
        id
      }
      reserve0
      reserve1
      totalSupply
      reserveUSD
      reserveETH
      trackedReserveETH
      token0Price
      token1Price
      volumeToken0
      volumeToken1
      volumeUSD
      untrackedVolumeUSD
      dailyVolumeUSD
      weeklyVolumeUSD
      day
      week
    }
  }
`

export const GET_REWARD_POOLS = gql`
  query RewardsPools {
    miningPairs(orderBy: volumeUSD) {
      id
      epoch {
        id
      }
      rank
      pair {
        id
        token0 {
          id
        }
        token1 {
          id
        }
        reserve0
        reserve1
        totalSupply
        reserveUSD
        reserveETH
        trackedReserveETH
        token0Price
        token1Price
        volumeToken0
        volumeToken1
        volumeUSD
        untrackedVolumeUSD
        dailyVolumeUSD
        weeklyVolumeUSD
        day
        week
      }
      weight
      lpmining
      volumeUSD
    }
  }
`
