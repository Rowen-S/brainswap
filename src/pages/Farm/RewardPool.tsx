import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Row from 'components/Row'
import { rewardsPool } from 'constants/misc'

export default function RewardPool() {
  return (
    <StairCard
      bg={StairBgImage}
      style={{
        minWidth: '380px',
      }}
    >
      <Text fontSize={16}>The Rewards pool</Text>

      <Row
        style={{
          marginTop: '10px',
        }}
        align="flex-end"
      >
        <Text fontSize={42}>{rewardsPool.toLocaleString()}</Text>
        <Text
          opacity={0.5}
          fontSize={16}
          ml={10}
          style={{
            position: 'relative',
            top: '-6px',
          }}
        >
          IQ200
        </Text>
      </Row>
      <Text opacity={0.5} fontSize={14} mt={10}>
        will be distributed this epoch
      </Text>
    </StairCard>
  )
}
