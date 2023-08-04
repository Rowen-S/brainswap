import styled from 'styled-components/macro'

import Row, { RowBetween, RowFixed } from 'components/Row'
import React from 'react'
import InputAmount from 'components/InputAmount'
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
  font-size: 14px;
  opacity: 0.5;
`

export default function AddLP() {
  return (
    <>
      <ILOCardTitle>Add IQ200 LP offering</ILOCardTitle>
      <RowFixed
        style={{
          marginTop: '20px',
        }}
      >
        <ILOCardMidTitle>Take rhe faster way to get BRAINSWAP platform token</ILOCardMidTitle>
      </RowFixed>

      <RowBetween
        style={{
          marginTop: '30px',
        }}
      >
        <ILOCardSmallTitle>Balance 200 ETH</ILOCardSmallTitle>
        <ILOCardSmallTitle>Allocation 10 ETH</ILOCardSmallTitle>
      </RowBetween>

      <InputAmount placeholder="Enter amount" />

      <ButtonNormal
        style={{
          margin: '93px auto 0 auto',
          width: '400px',
        }}
      >
        Add ETH and claim IQ200/ETH esLP
      </ButtonNormal>
    </>
  )
}
