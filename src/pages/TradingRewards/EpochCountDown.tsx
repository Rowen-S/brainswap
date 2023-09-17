import { StairCard } from 'components/StairCard'
import { useCallback } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Countdown from 'react-countdown'
import { towWeek, tradStartTime } from 'constants/misc'
import { DateTime } from 'luxon'

export default function EpochCountDown({ epoch }: { epoch: number | undefined }) {
  let endTimestamp: number | undefined
  if (epoch) {
    endTimestamp = (tradStartTime + epoch * towWeek) * 1000
  }

  const frommatTime = endTimestamp && DateTime.fromMillis(endTimestamp)

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
        position: 'relative',
        top: '-6px',
      }}
    >
      <Text fontSize={16}>Countdown</Text>

      <div
        style={{
          marginTop: '10px',
        }}
      >
        {endTimestamp && DateTime && (
          <Countdown now={() => DateTime.now().toMillis()} date={endTimestamp} renderer={initRenderer} />
        )}
      </div>
      <Text opacity={0.5} fontSize={14} mt={10}>
        until the next epoch on {frommatTime ? frommatTime.toFormat('LLLL') : '-'}{' '}
        {frommatTime ? frommatTime.toFormat('d') : '-'}
      </Text>
    </StairCard>
  )
}
