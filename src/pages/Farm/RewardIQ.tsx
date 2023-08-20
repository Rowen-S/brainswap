import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { Text } from 'rebass'
import { ColumnCenter } from 'components/Column'

const IQNumberWrapper = styled(ColumnCenter)``

const IQNumberTitle = styled(Text)`
  color: #ffffff;
  opacity: 0.5;
  font-size: 12px;
`

const IQNumber = styled(Text)`
  color: #ffffff;
  font-size: 28px;
  margin-top: 22px !important;
`
export default function RewardIQ() {
  return (
    <StairCard bg={StairBgImage}>
      <RowBetween>
        <IQNumberWrapper>
          <IQNumberTitle>My Total IQ</IQNumberTitle>
          <IQNumber>299999</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Trading IQ </IQNumberTitle>
          <IQNumber>299999</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Red Bull IQ</IQNumberTitle>
          <IQNumber>299999</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Red bull</IQNumberTitle>
          <IQNumber fontSize="18px" color="#2CFFF3">
            Drink to increase IQ
          </IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Pill Boost</IQNumberTitle>
          <IQNumber>Superman Pill</IQNumber>
        </IQNumberWrapper>
      </RowBetween>
    </StairCard>
  )
}
