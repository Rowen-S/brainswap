import React from 'react'
import { Text } from 'rebass'
import styled from 'styled-components'
import RewardIQ from './RewardIQ'
import { RowBetween, RowFixed } from 'components/Row'
import RewardESIQ from './RewardESIQ'
import Column, { AutoColumn } from 'components/Column'
import EpochCountDown from './EpochCountDown'
import RewardPool from './RewardPool'
import ConvertIQ from './ConvertIQ'
import VestingHistory from './VestingHistory'
import Leaderboard from './LeaderBoard'

const ContentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`

const PrimaryTitle = styled(Text)`
  color: #ffffff;
  font-size: 28px;
`
const SecondrayTitle = styled(Text)`
  color: #ffffff;
  opacity: 0.5;
  font-size: 14px;
`
export default function Farm() {
  return (
    <ContentWrapper>
      <PrimaryTitle>Genesis Epoch Trading Leaderboard</PrimaryTitle>
      <SecondrayTitle marginTop="20px">
        Get to the top of the leaderboard in GENESIS EPOCH to determine your NEXT EPOCH trading boost
      </SecondrayTitle>

      <RewardIQ />

      <RowBetween>
        <RewardESIQ />

        <div>
          <AutoColumn justify="space-between">
            <EpochCountDown />
            <RewardPool />
          </AutoColumn>
        </div>
      </RowBetween>

      <ConvertIQ />

      <VestingHistory />

      <Leaderboard />
    </ContentWrapper>
  )
}
