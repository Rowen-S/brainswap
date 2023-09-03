import { StairCard } from 'components/StairCard'
import { useMemo } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { RowBetween } from 'components/Row'
import styled from 'styled-components'
import { Text } from 'rebass'
import { ColumnCenter } from 'components/Column'
import { useQuery } from '@apollo/client'
import { GET_LP_TRAD_POWER, PowerProps } from 'lib/thegraph/gql/trading'
import { tradingClient } from 'lib/thegraph'
import { useWeb3React } from '@web3-react/core'
import { formatToFixed } from 'utils'
import { DateTime } from 'luxon'
import { towWeek } from 'constants/misc'

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
  const { loading, error, data } = useQuery<PowerProps>(GET_LP_TRAD_POWER, {
    client: tradingClient,
    variables: { user: account },
    pollInterval: 5000,
    notifyOnNetworkStatusChange: true,
  })

  const myLpPower = useMemo(() => {
    if (!loading && !error && data && data.lpinfos.length) {
      const liquidityStartDateTime = DateTime.fromSeconds(Number(data.lpinfos[0].liquidityStart))
      const timeDifferenceInSeconds = DateTime.now().diff(liquidityStartDateTime).as('seconds')
      const countLpPower =
        (timeDifferenceInSeconds * Math.pow(parseFloat(data.lpinfos[0].amountTotalUSD), 0.7) * 10) / towWeek
      const lpPower = countLpPower + parseFloat(data.lpinfos[0].power ?? '0')
      return lpPower
    }
    return 0
  }, [data, error, loading])

  const myTradPower = useMemo(() => {
    if (!loading && !error && data && data.userMiningInfos.length) {
      const tradPower = parseFloat(data.userMiningInfos[0].power ?? '0')
      return tradPower
    }
    return 0
  }, [data, error, loading])

  const myTotalPower = useMemo(() => {
    return myLpPower + myTradPower
  }, [myLpPower, myTradPower])

  return (
    <StairCard bg={StairBgImage}>
      <RowBetween>
        <IQNumberWrapper>
          <IQNumberTitle>My Total Power</IQNumberTitle>
          <IQNumber>{formatToFixed(myTotalPower) ?? '-'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Trading Power</IQNumberTitle>
          <IQNumber>{formatToFixed(myTradPower) ?? '-'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>LP Power</IQNumberTitle>
          <IQNumber>{formatToFixed(myLpPower) ?? '-'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Referral Power</IQNumberTitle>
          <IQNumber>Coming Soon</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Red bull Power</IQNumberTitle>
          <IQNumber fontSize="18px" color="#2CFFF3">
            Drink to increase IQ
          </IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Pill Boost</IQNumberTitle>
          <IQNumber>Coming Soon</IQNumber>
        </IQNumberWrapper>
      </RowBetween>
    </StairCard>
  )
}
