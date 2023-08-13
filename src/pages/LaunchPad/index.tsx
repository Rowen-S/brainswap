import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../components/Column'
import Row from 'components/Row'

import StairBgImage from '../../assets/svg/stair_bg.svg'
import { StairCard } from 'components/StairCard'
import SupplyItem from './SupplyItem'
import AddLP from './AddLP'
import ConvertLP from './ConvertLP'
import LPHistory from './LPHistory'
import { useWeb3React } from '@web3-react/core'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { IQ } from 'constants/tokens'
import { formatEther } from '@ethersproject/units'
import { useIDOContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
// import { useCallback } from 'react'
import { IDO_RATIO } from 'constants/misc'
import { Text } from 'rebass'
import Countdown from 'react-countdown'
import { useCallback, useEffect, useMemo, useState } from 'react'
import CountDownZero from 'components/CountDownZero'
import TokenDistribution from './TokenDistribution'

const PageWrapper = styled(AutoColumn)`
  width: 100%;
`
const ContentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`

const SectionWrapper = styled.section`
  margin-top: 50px;
`

const ILOTitle = styled(Row)`
  color: ${({ theme }) => theme.text1};
  font-size: 28px;
`

const OfferWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 40px;
`

export default function LaunchPad() {
  const { library, chainId, account } = useWeb3React()
  const idoContract = useIDOContract()
  const iq = chainId ? IQ[chainId] : undefined

  useEffect(() => {
    console.log(account)
  }, [account])

  const totalSupply: CurrencyAmount<Token> | undefined = useTotalSupply(iq)

  const idoSupply = useSingleCallResult(idoContract, 'totalInvestedETH', [])?.result?.[0]

  const userInfo = useSingleCallResult(idoContract, 'userInfo', account ? [account] : [])?.result

  const [{ startTimestamp, endTimestamp, unlockTimestamp }, setInit] = useState<{
    startTimestamp: number | undefined
    endTimestamp: number | undefined
    unlockTimestamp: number | undefined
  }>({
    startTimestamp: undefined,
    endTimestamp: undefined,
    unlockTimestamp: undefined,
  })

  console.log(startTimestamp)

  const initTimestamps = useCallback(async () => {
    const { startTimestamp, endTimestamp, unlockTimestamp } = await idoContract.timestamps()
    setInit({
      startTimestamp: startTimestamp.mul(1000).toNumber(),
      endTimestamp: endTimestamp.mul(1000).toNumber(),
      unlockTimestamp: unlockTimestamp.mul(1000).toNumber(),
    })
  }, [idoContract])

  const [nowTime, setNowTime] = useState<number>()

  useEffect(() => {
    if (!nowTime) return
    const addNowTime = () => {
      setNowTime(nowTime + 1000)
    }

    const timerId = setInterval(addNowTime, 1000)

    !chainId ? setNowTime(undefined) : null

    return () => {
      clearInterval(timerId)
    }
  }, [nowTime, chainId])

  const isBuy = useMemo(() => {
    if (endTimestamp && nowTime) {
      return nowTime <= endTimestamp ? true : false
    }
    return false
  }, [endTimestamp, nowTime])

  const isRefund = useMemo(
    () => (idoSupply ? (Number(formatEther(idoSupply)) < 100 ? true : false) : false),
    [idoSupply]
  )

  const getNowTime = useCallback(() => {
    if (library) {
      library.getBlock('latest').then((res: any) => {
        setNowTime(res.timestamp * 1000)
      })
    } else {
      setNowTime(undefined)
    }
  }, [library, setNowTime])

  const formatNumber = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }, [])

  useEffect(() => {
    if (account && chainId) {
      initTimestamps()
      getNowTime()
    }
    return () => {
      setInit({
        startTimestamp: undefined,
        endTimestamp: undefined,
        unlockTimestamp: undefined,
      })
    }
  }, [account, chainId, getNowTime, initTimestamps])

  const initRenderer = useCallback(
    ({
      days,
      hours,
      minutes,
      seconds,
      completed,
    }: {
      days: number
      hours: number
      minutes: number
      seconds: number
      completed: boolean
    }) => {
      // Renderer callback with condition
      if (completed) {
        // Render a completed state
        return nowTime && <Countdown now={() => nowTime} date={endTimestamp} renderer={() => <></>} />
      } else {
        // Render a countdown
        return (
          <Text fontSize={55}>
            {/* {formatNumber(hours + days * 24)}:{formatNumber(minutes)}:{formatNumber(seconds)} */}
            <CountDownZero
              hours={formatNumber(hours + days * 24)}
              minutes={formatNumber(minutes)}
              seconds={formatNumber(seconds)}
            ></CountDownZero>
          </Text>
        )
      }
    },
    [endTimestamp, nowTime, formatNumber]
  )

  const [claimLPPercent, setClaimLPPercent] = useState(0)
  useEffect(() => {
    if (unlockTimestamp && nowTime) {
      const endTimestamp = unlockTimestamp + 14 * 24 * 60 * 60 * 1000
      const percent = ((nowTime - unlockTimestamp) / (endTimestamp - unlockTimestamp)) * 100
      setClaimLPPercent(percent < 0 ? 0 : percent)
    }
  }, [unlockTimestamp, nowTime])

  return (
    <PageWrapper>
      <ContentWrapper>
        {nowTime && endTimestamp ? (
          <div
            style={{
              margin: '0 auto',
            }}
          >
            <Text textAlign="center" color="#FFFFFF" fontSize="28px">
              COUNTDOWN
            </Text>
            <Text textAlign="center" color="#ffffff" opacity="0.4" fontSize="14px" marginTop="10px" marginBottom="30px">
              Brainswap Platform Token IQ ILO
            </Text>
            <Countdown now={() => nowTime} date={endTimestamp} renderer={initRenderer} />
          </div>
        ) : null}
        <SectionWrapper>
          <ILOTitle>IQ Initial Launchpad Offerings</ILOTitle>
          <StairCard bg={StairBgImage}>
            <Row height="100%" align={'start'} justify="space-around">
              <SupplyItem
                title="Total Supply"
                content={{
                  value: totalSupply?.toSignificant(4),
                  suffix: 'IQ',
                }}
                desc="Fair launch for ALL MEME DEGEN"
              />
              <SupplyItem
                title="IDO Supply"
                content={{
                  value: totalSupply?.multiply(IDO_RATIO)?.toSignificant(4),
                  suffix: '[10%]',
                }}
                desc="Equivalent to 10 ETH"
              />
              <SupplyItem
                title="Softcap"
                content={{
                  value: '100',
                  suffix: 'ETH',
                }}
              />
              <SupplyItem
                title="Total Raised"
                content={{
                  value: idoSupply ? formatEther(idoSupply) : '-',
                  suffix: 'ETH',
                }}
                desc="Equivalent to 10 ETH"
              />
              <SupplyItem
                title="FDV"
                content={{
                  value: '',
                  suffix: 'ETH/IQ',
                }}
              />
            </Row>
          </StairCard>

          <Text fontSize={14} maxWidth={['90%', '65%']} margin="0px auto" lineHeight={'24px'} textAlign={'center'}>
            *There is no Hard Cap where the IQ price will continuously increase at every purchase. No matter when you
            participate, everyone will get IQ tokens at the same final price. If Total Raised doesn’t meet the Soft Cap,
            all the ETH raised will be refunded. The 10% IQ token will be airdropped to the participated address
            according to the ETH share.
          </Text>

          <OfferWrapper>
            <StairCard bg={StairBgImage}>
              <AddLP userInfo={userInfo} isbuy={isBuy} isRefund={isRefund} />
            </StairCard>
            <StairCard bg={StairBgImage}>
              <ConvertLP userInfo={userInfo} distance={claimLPPercent} />
            </StairCard>
          </OfferWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Buy History</ILOTitle>

          <StairCard bg={StairBgImage}>
            <LPHistory />
          </StairCard>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Token Distribution</ILOTitle>

          <StairCard bg={StairBgImage}>
            <TokenDistribution />
          </StairCard>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Disclaimer</ILOTitle>

          <StairCard
            bg={StairBgImage}
            style={{
              opacity: 0.8,
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '30px',
            }}
          >
            {`Please ensure you understand the public sale mechanics and terms before proceeding, deposited amounts CANNOT
          be withdrawn.Initially, the auction will start with a fully diluted valuation (FDV) of $830k, fixing a $0.0083
          floor price for $RDO, and will increase after the first $100k have been raised. Once those $100k are reached,
          we'll enter a price-discovery phase, where the token price will continuously increase at every purchase. 
          `}
            <br />
            {`No matter when you participate, everyone will get $RDO tokens at the same final price. Your allocation will be
          made up of $srRDO, a receipt token made up of 30% $RDO and 70% $xRDO. Please check the Rodeo dapp page for
          $RDO claims and information.`}
          </StairCard>
        </SectionWrapper>
      </ContentWrapper>
    </PageWrapper>
  )
}
