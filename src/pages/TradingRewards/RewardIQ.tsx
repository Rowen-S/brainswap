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
import Loader from 'components/Loader'
// import NumberAnimation from 'components/NumberAnimation'

const IQNumberWrapper = styled(ColumnCenter)`
  justify-content: space-between;
  height: 62px;
`

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

export default function RewardIQ({ epoch }: { epoch: number | undefined }) {
  const { account } = useWeb3React()
  const { loading, error, data } = useQuery<PowerProps>(GET_LP_TRAD_POWER, {
    client: tradingClient,
    variables: { user: account, epoch: epoch },
    fetchPolicy: 'network-only',
    pollInterval: 1000 * 10,
    notifyOnNetworkStatusChange: true,
  })

  const myLpPower = useMemo(() => {
    if (!loading && !error && data && data.lpinfos.length) {
      let count = 0
      data.lpinfos.map((lp) => {
        const liquidityStartDateTime = DateTime.fromSeconds(Number(lp.liquidityStart))
        const timeDifferenceInSeconds = DateTime.now().diff(liquidityStartDateTime).as('seconds')
        const amountTotalUSD = parseFloat(lp.amountTotalUSD) < 0 ? 0 : parseFloat(lp.amountTotalUSD)
        const countLpPower = (timeDifferenceInSeconds * Math.pow(amountTotalUSD, 0.5)) / towWeek
        const lpPower = countLpPower + parseFloat(lp.power ?? '0')
        count += lpPower
      })
      return count
      // const liquidityStartDateTime = DateTime.fromSeconds(Number(data.lpinfos[0].liquidityStart))
      // const timeDifferenceInSeconds = DateTime.now().diff(liquidityStartDateTime).as('seconds')
      // const amountTotalUSD =
      //   parseFloat(data.lpinfos[0].amountTotalUSD) < 0 ? 0 : parseFloat(data.lpinfos[0].amountTotalUSD)
      // const countLpPower = (timeDifferenceInSeconds * Math.pow(amountTotalUSD, 0.5)) / towWeek
      // const lpPower = countLpPower + parseFloat(data.lpinfos[0].power ?? '0')
      // return lpPower
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

  const myTotalPower = useMemo(() => myTradPower + myLpPower, [myLpPower, myTradPower])

  return (
    <StairCard bg={StairBgImage}>
      <RowBetween>
        <IQNumberWrapper>
          <IQNumberTitle>My Total Power</IQNumberTitle>
          <IQNumber>{loading ? <Loader /> : formatToFixed(myTotalPower, 4) ?? '0'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Trading Power</IQNumberTitle>
          <IQNumber>{loading ? <Loader /> : formatToFixed(myTradPower, 4) ?? '0'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>LP Power</IQNumberTitle>
          <IQNumber>{loading ? <Loader /> : formatToFixed(myLpPower, 4) ?? '-'}</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Referral Power</IQNumberTitle>
          <IQNumber fontSize={20}>Coming Soon</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Red bull Power</IQNumberTitle>
          <IQNumber fontSize={20}>Coming Soon</IQNumber>
        </IQNumberWrapper>
        <IQNumberWrapper>
          <IQNumberTitle>Pill Boost</IQNumberTitle>
          <IQNumber fontSize={20}>Coming Soon</IQNumber>
        </IQNumberWrapper>
      </RowBetween>
    </StairCard>
  )
}
