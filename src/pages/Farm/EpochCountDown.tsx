import { StairCard } from 'components/StairCard'
import React, { useCallback } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Countdown from 'react-countdown'

const endTimestamp = new Date().getTime() + 500000000

export default function EpochCountDown() {
  const formatNumber = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 1,
      useGrouping: false,
    })
  }, [])
  const initRenderer = useCallback(
    ({
      days,
      hours,
      minutes,
    }: {
      days: number
      hours: number
      minutes: number
      seconds: number
      completed: boolean
    }) => {
      // debugger
      return <div>{`${formatNumber(days)}d:${formatNumber(hours)}h:${formatNumber(minutes)}m`}</div>
    },
    [formatNumber]
  )
  return (
    <StairCard
      bg={StairBgImage}
      style={{
        minWidth: '380px',
      }}
    >
      <Text fontSize={16}>Countdown</Text>

      <div
        style={{
          marginTop: '10px',
        }}
      >
        <Countdown
          now={() => new Date().getTime()}
          date={endTimestamp}
          renderer={initRenderer}
          key={new Date().getTime()}
        />
      </div>
      <Text opacity={0.5} fontSize={14} mt={10}>
        until the next epoch on May 22
      </Text>
    </StairCard>
  )
}
