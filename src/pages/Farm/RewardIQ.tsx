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
  })

  console.log(loading, error, data)

  const myTotalPower = useMemo(() => {
    if (!loading && !error && data && data.lpinfos.length && data.userMiningInfos.length) {
      const lpPower = parseFloat(data.lpinfos[0].power ?? '0')
      const tradPower = parseFloat(data.userMiningInfos[0].power ?? '0')
      return lpPower + tradPower
    }
    return 0
  }, [data, error, loading])

  return (
    <StairCard bg={StairBgImage}>
      <RowBetween>
        <IQNumberWrapper>
          <IQNumberTitle>My Total Power</IQNumberTitle>
          <IQNumber>{formatToFixed(myTotalPower.toString())}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Trading Power</IQNumberTitle>
          <IQNumber>
            {(data && data?.userMiningInfos?.[0]?.power && formatToFixed(data?.userMiningInfos?.[0]?.power)) ?? '-'}
          </IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>LP Power</IQNumberTitle>
          <IQNumber>{(data && data?.lpinfos?.[0]?.power && formatToFixed(data?.lpinfos?.[0]?.power)) ?? '-'}</IQNumber>
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
          <IQNumber>Superman Pill</IQNumber>
        </IQNumberWrapper>
      </RowBetween>
    </StairCard>
  )
}
