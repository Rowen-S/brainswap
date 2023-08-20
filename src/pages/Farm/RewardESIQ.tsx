import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Row from 'components/Row'
import { ButtonNormal } from 'components/Button'

export default function RewardESIQ() {
  return (
    <StairCard
      bg={StairBgImage}
      style={{
        flexGrow: 1,
      }}
    >
      <Text fontSize={16}>My Trading rewards</Text>

      <Row align="flex-end" mt={40}>
        <Text fontSize={42}>123,456,787</Text>
        <Text
          fontSize={16}
          opacity={0.5}
          marginLeft={10}
          style={{
            position: 'relative',
            top: '-6px',
          }}
        >
          esIQ200
        </Text>
      </Row>

      <Text fontSize={14} opacity={0.5} mt={36}>
        The token will be claimable this epoch. The unclaimed token will be expired after epoch
      </Text>

      <ButtonNormal mt={70}>Claim All esIQ200</ButtonNormal>
    </StairCard>
  )
}
