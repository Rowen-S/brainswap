import styled from 'styled-components/macro'
import Row, { RowFixed } from 'components/Row'
import React from 'react'
import LockSvg from '../../assets/svg/lock.svg'
import unLockSvg from '../../assets/svg/unlock.svg'
import { ButtonNormal } from 'components/Button'

const ILOCardTitle = styled(Row)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`
const ILOCardMidTitle = styled.div`
  color: #ffffff;
  font-size: 16px;
  opacity: 0.5;
`
const ILOCardSmallTitle = styled.div`
  color: #ffffff;
  font-size: 12px;
  opacity: 0.7;
  margin-left: 8px;
`

const ILOCardSimpleText = styled.div`
  color: #ffffff;
  font-size: 14px;
`

const LockWrapper = styled.div`
  margin-top: 24px;
`

const LockIcon = styled.img`
  width: 20px;
  height: 20px;
`

const UnLockIcon = styled.img`
  width: 20px;
  height: 20px;
`

export default function ConvertLP() {
  return (
    <>
      <ILOCardTitle>Convert to IQ200/ETH LP</ILOCardTitle>
      <RowFixed
        style={{
          marginTop: '20px',
        }}
      >
        <ILOCardMidTitle>Unlock all esLP token with 28days</ILOCardMidTitle>
      </RowFixed>

      <Row
        justify="space-between"
        style={{
          marginTop: '30px',
        }}
      >
        <ILOCardSimpleText>0%</ILOCardSimpleText>
        <ILOCardSimpleText>14Days (50%)</ILOCardSimpleText>
        <ILOCardSimpleText>28Days (100%)</ILOCardSimpleText>
      </Row>

      <LockWrapper>
        <Row>
          <LockIcon src={LockSvg} />
          <ILOCardSmallTitle>Locked: 50,000 IQ200/ 5ETH LP</ILOCardSmallTitle>
        </Row>

        <Row
          style={{
            marginTop: '16px',
          }}
        >
          <UnLockIcon src={unLockSvg} />
          <ILOCardSmallTitle>Unlocked: 50,000 IQ200/ 5ETH LP</ILOCardSmallTitle>
        </Row>
      </LockWrapper>

      <ButtonNormal
        style={{
          margin: '93px auto 0 auto',
          width: '400px',
        }}
      >
        Claim IQ200/ETH LP
      </ButtonNormal>
    </>
  )
}
