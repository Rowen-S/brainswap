import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { Text } from 'rebass'
import { ColumnCenter } from 'components/Column'
import { useQuery } from '@apollo/client'
import { GET_LP_TRAD_POWER } from 'lib/thegraph/gql/trading'
import { tradingClient } from 'lib/thegraph'
import { useWeb3React } from '@web3-react/core'
import { formatToFixed } from 'utils'

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
  const { account } = useWeb3React()
  const { loading, error, data } = useQuery(GET_LP_TRAD_POWER, {
    client: tradingClient,
    variables: { user: account },
  })

  console.log(loading, error, data)

  return (
    <StairCard bg={StairBgImage}>
      <RowBetween>
        <IQNumberWrapper>
          <IQNumberTitle>My Total Power</IQNumberTitle>
          <IQNumber>299999</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Trading Power</IQNumberTitle>
          <IQNumber>{(data && formatToFixed(data?.userMiningInfos?.[0]?.power)) ?? '-'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>LP Power</IQNumberTitle>
          <IQNumber>{(data && data?.lpinfos.length[0]?.power) ?? '-'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Referral Power</IQNumberTitle>
          <IQNumber>299999</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Red bull Power</IQNumberTitle>
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
