import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Box, Text } from 'rebass'
import { RowBetween } from 'components/Row'
import Progress from 'components/Progress'
import { ButtonNormal } from 'components/Button'

export default function ConvertIQ() {
  return (
    <StairCard bg={StairBgImage}>
      <Text fontSize={16}>Convert to IQ token</Text>

      <RowBetween mt={25}>
        <Text fontSize={12} opacity={0.5}>
          Select IQ Lock Times: 30 days
        </Text>
        <Text fontSize={12} opacity={0.5}>
          Balance 63,456 esIQ200
        </Text>
      </RowBetween>
      <Box mt={50}>
        <Progress progress={50} />
      </Box>

      <RowBetween mt={30}>
        <Text fontSize={12} opacity={0.5}>
          7 Days
        </Text>
        <Text fontSize={12} opacity={0.5}>
          14 days
        </Text>
      </RowBetween>

      <Text fontSize={12} opacity={0.5} mt={20}>
        And the remainning token will be transferred to Treasure
      </Text>

      <ButtonNormal m={'auto'} mt={30} maxWidth={558}>
        Convert
      </ButtonNormal>
    </StairCard>
  )
}