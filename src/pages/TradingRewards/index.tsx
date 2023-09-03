import React, { useMemo } from 'react'
import { Text } from 'rebass'
import styled from 'styled-components/macro'
import RewardIQ from './RewardIQ'
import { RowBetween } from 'components/Row'
import RewardESIQ from './RewardESIQ'
import { AutoColumn } from 'components/Column'
import EpochCountDown from './EpochCountDown'
import RewardPool from './RewardPool'
import ConvertIQ from './ConvertIQ'
import VestingHistory from './VestingHistory'
import Leaderboard from './LeaderBoard'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import { towWeek, tradStartTime } from 'constants/misc'

const ContentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
  color: ${({ theme }) => theme.text1};
`

const PrimaryTitle = styled(Text)`
  color: ${({ theme }) => theme.text1};
  font-size: 28px;
`
const SecondrayTitle = styled(Text)`
  color: ${({ theme }) => theme.text1};
  opacity: 0.5;
  font-size: 14px;
`

// now - tradStartTime / 2W
export default function TradingRewards() {
  const blockTimestamp = useCurrentBlockTimestamp()
  const epoch = useMemo(() => {
    if (blockTimestamp && tradStartTime) {
      return Math.ceil((blockTimestamp.toNumber() - tradStartTime) / towWeek)
    }
    return
  }, [blockTimestamp])

  return (
    <ContentWrapper>
      <PrimaryTitle>Genesis Epoch ({epoch ?? '-'}) Trading Leaderboard</PrimaryTitle>
      <SecondrayTitle marginTop="20px">
        Get to the top of the leaderboard in GENESIS EPOCH to determine your NEXT EPOCH trading boost
      </SecondrayTitle>
      <RewardIQ />
      <RowBetween>
        <RewardESIQ />
        <div>
          <AutoColumn justify="space-between">
            <EpochCountDown epoch={epoch} />
            <RewardPool />
          </AutoColumn>
        </div>
      </RowBetween>

      <ConvertIQ />

      <VestingHistory />

      <Leaderboard epoch={epoch} />
    </ContentWrapper>
  )
}