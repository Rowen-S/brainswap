import { ColumnCenter } from 'components/Column'
import Row from 'components/Row'
import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
interface CountDownZeroProps {
  hours: string
  minutes: string
  seconds: string
}

const TimeWrapper = styled(ColumnCenter)`
  width: 140px;
  height: 140px;
  background: linear-gradient(180deg, #000000 0%, #171930 100%, #171930 100%), linear-gradient(0deg, #181b2e, #181b2e);
  border-radius: 16px;
  border: 1px solid rgba(24, 27, 46, 1);
  padding: 38px 0 20px 0;
  justify-content: space-between;
`

const TimeText = styled(Text)`
  font-size: 62px;
  color: #ffffff;
`

const TimeDescText = styled(Text)`
  font-size: 14px;
  color: #ffffff;
  opacity: 0.4;
`

const TimeSeperate = styled.div`
  font-size: 42px;
  padding: 0 45px;
  color: #ffffff;
`

export default function CountDownZero(props: CountDownZeroProps) {
  return (
    <Row align="center" justify="center">
      <TimeWrapper>
        <TimeText>{props.hours || 0}</TimeText>
        <TimeDescText>HOURS</TimeDescText>
      </TimeWrapper>

      <TimeSeperate>:</TimeSeperate>

      <TimeWrapper>
        <TimeText>{props.minutes || 0}</TimeText>
        <TimeDescText>MINUTES</TimeDescText>
      </TimeWrapper>

      <TimeSeperate>:</TimeSeperate>

      <TimeWrapper>
        <TimeText>{props.seconds || 0}</TimeText>
        <TimeDescText>SECONDS</TimeDescText>
      </TimeWrapper>
    </Row>
  )
}
