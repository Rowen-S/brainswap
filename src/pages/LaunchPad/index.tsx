import { CurrencyAmount, Token, WETH9 } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../components/Column'
import Row from 'components/Row'
import JSBI from 'jsbi'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { StairCard } from 'components/StairCard'
import SupplyItem from './SupplyItem'
import AddLP from './AddLP'
import ConvertLP from './ConvertLP'
import LPHistory from './LPHistory'
import { useWeb3React } from '@web3-react/core'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { IQ } from 'constants/tokens'
import { formatEther, parseEther } from '@ethersproject/units'
import { useIDOContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
// import { useCallback } from 'react'
import { IDO_RATIO } from 'constants/misc'
import { Text } from 'rebass'
import Countdown from 'react-countdown'
import { useCallback, useEffect, useMemo, useState } from 'react'
import CountDownZero from 'components/CountDownZero'
import TokenDistribution from './TokenDistribution'
import { BigNumber } from 'ethers'
import { useUSDCValue } from 'hooks/useUSDCPrice'

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

const localStartTimeStamp = 1692433827000
const localEndTimeStamp = 1692441027000
const localUnlockTimestamp = 1692441028000

const maxRaise = parseEther('0.1')

const days = 28
const lpLockTime = days * 24 * 60 * 3600

export default function LaunchPad() {
  const { library, chainId, account } = useWeb3React()
  const idoContract = useIDOContract()
  const iq = chainId ? IQ[chainId] : undefined

  const totalSupply: CurrencyAmount<Token> | undefined = useTotalSupply(iq)

  const idoSupply: BigNumber = useSingleCallResult(idoContract, 'totalInvestedETH', [])?.result?.[0]

  const WETH = WETH9[80001]

  let valueAmountInWETH: CurrencyAmount<Token> | undefined
  if (idoSupply) {
    valueAmountInWETH = CurrencyAmount.fromRawAmount(
      WETH,
      JSBI.divide(JSBI.multiply(JSBI.divide(JSBI.BigInt(idoSupply), JSBI.BigInt(2)), JSBI.BigInt(100)), JSBI.BigInt(10))
    )
  }

  const USDPrice = useUSDCValue(valueAmountInWETH)

  const [userInfo, setUserInfo] =
    useState<{
      debt: BigNumber
      total: BigNumber
      totalInvestedETH: BigNumber
    }>()

  const getUserInfo = useCallback(() => {
    if (account) {
      idoContract?.userInfo(account).then((res) => {
        setUserInfo({
          debt: res.debt,
          total: res.total,
          totalInvestedETH: res.totalInvestedETH,
        })
      })
    }
  }, [idoContract, account])

  useEffect(() => {
    if (account) getUserInfo()

    return () => {
      setUserInfo(undefined)
    }
  }, [account, getUserInfo])

  const [{ startTimestamp, endTimestamp, unlockTimestamp }, setInit] = useState<{
    startTimestamp: number | undefined
    endTimestamp: number | undefined
    unlockTimestamp: number | undefined
  }>({
    startTimestamp: localStartTimeStamp,
    endTimestamp: localEndTimeStamp,
    unlockTimestamp: localUnlockTimestamp,
  })

  const initTimestamps = useCallback(async () => {
    try {
      const { startTimestamp, endTimestamp, unlockTimestamp } = await idoContract.timestamps()
      setInit({
        startTimestamp: startTimestamp.mul(1000).toNumber(),
        endTimestamp: endTimestamp.mul(1000).toNumber(),
        unlockTimestamp: unlockTimestamp.mul(1000).toNumber(),
      })
    } catch (error) {}
  }, [idoContract])

  const [nowTime, setNowTime] = useState<number>()

  // useEffect(() => {
  //   console.log('endTimestamp=' + endTimestamp)
  // }, [endTimestamp])

  useEffect(() => {
    if (!nowTime) return
    const addNowTime = () => {
      setNowTime(nowTime + 1000)
    }

    if (chainId) {
    }

    const timerId = setInterval(addNowTime, 1000)

    // !chainId ? setNowTime(undefined) : null

    return () => {
      clearInterval(timerId)
    }
  }, [nowTime, chainId])

  const isBuy = useMemo(() => {
    if (endTimestamp && nowTime && idoSupply) {
      // return nowTime <= endTimestamp ? true : false
      // console.log(idoSupply)
      // console.log(maxRaise)
      // console.log(idoSupply.lte(maxRaise))

      // const x = userInfo?.totalInvestedETH >= maxRaise
      const more = maxRaise.lte(idoSupply)
      // debugger
      if (nowTime <= endTimestamp || (nowTime > endTimestamp && more)) return true
    }
    return false
  }, [endTimestamp, nowTime, idoSupply])

  const isIDOExpired = useMemo(() => {
    if (endTimestamp && nowTime) {
      return nowTime <= endTimestamp ? false : true
    }
    return true
  }, [endTimestamp, nowTime])

  const isRefund = useMemo(
    () => (idoSupply ? (Number(formatEther(idoSupply)) < 100 ? true : false) : false),
    [idoSupply]
  )

  const getNowTime = useCallback(() => {
    if (library) {
      library
        .getBlock('latest')
        .then((res: any) => {
          setNowTime(res.timestamp * 1000)
        })
        .catch(() => {
          console.log('set now time library--')

          setNowTime(new Date().getTime())
        })
    } else {
      console.log('set now time--')

      setNowTime(new Date().getTime())
    }
  }, [library, setNowTime])

  const formatNumber = useCallback((num: number) => {
    return num.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    })
  }, [])

  useEffect(() => {
    if (chainId) {
      initTimestamps()
      getNowTime()
    } else {
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
    }: // completed,
    {
      days: number
      hours: number
      minutes: number
      seconds: number
      completed: boolean
    }) => {
      // debugger
      return (
        <Text fontSize={55}>
          {/* {formatNumber(hours + days * 24)}:{formatNumber(minutes)}:{formatNumber(seconds)} */}
          <CountDownZero
            hours={formatNumber(hours + days * 24)}
            minutes={formatNumber(minutes)}
            seconds={formatNumber(seconds)}
          />
        </Text>
      )
    },
    [formatNumber]
  )

  const [claimLPPercent, setClaimLPPercent] = useState(0)
  useEffect(() => {
    if (unlockTimestamp && nowTime) {
      const endTimestamp = unlockTimestamp + lpLockTime
      const percent = ((nowTime - unlockTimestamp) / (endTimestamp - unlockTimestamp)) * 100
      setClaimLPPercent(percent < 0 ? 0 : Math.min(percent, 100))
    }
  }, [unlockTimestamp, nowTime])

  const onBuySucceed = () => {
    console.log('onBuySucceed')

    getUserInfo()
  }

  const onRefundSucceed = () => {
    getUserInfo()
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        {
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
            <Countdown
              now={() => nowTime || new Date().getTime()}
              date={endTimestamp || 1}
              renderer={initRenderer}
              key={nowTime}
            />
          </div>
        }
        <SectionWrapper>
          <ILOTitle>IQ Initial Launchpad Offerings</ILOTitle>
          <StairCard
            bg={StairBgImage}
            style={{
              background: '#0A0C1B',
            }}
          >
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
                  value: formatEther(maxRaise),
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
                  value: (USDPrice && USDPrice?.toSignificant(6, { groupSeparator: ',' })) ?? '-',
                  suffix: 'ETH/IQ',
                }}
              />
            </Row>
          </StairCard>

          <Text
            fontSize={14}
            maxWidth={['90%', '65%']}
            margin="0px auto"
            lineHeight={'24px'}
            textAlign={'center'}
            color="white"
            opacity="0.5"
          >
            *There is no Hard Cap where the IQ price will continuously increase at every purchase. No matter when you
            participate, everyone will get IQ tokens at the same final price. If Total Raised doesn’t meet the Soft Cap,
            all the ETH raised will be refunded. The 10% IQ token will be airdropped to the participated address
            according to the ETH share.
          </Text>

          <OfferWrapper>
            <StairCard
              bg={StairBgImage}
              style={{
                background: '#0A0C1B',
              }}
            >
              <AddLP
                userInfo={userInfo}
                isbuy={isBuy}
                isExpired={isIDOExpired}
                isRefund={isRefund}
                softCap={maxRaise}
                investedEth={idoSupply}
                onBuySucceed={onBuySucceed}
                onRefundSucceed={onRefundSucceed}
              />
            </StairCard>
            <StairCard
              bg={StairBgImage}
              style={{
                background: '#0A0C1B',
              }}
            >
              <ConvertLP userInfo={userInfo} distance={claimLPPercent} />
            </StairCard>
          </OfferWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Buy History</ILOTitle>

          <StairCard
            bg={StairBgImage}
            style={{
              background: '#0A0C1B',
            }}
          >
            <LPHistory />
          </StairCard>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Token Distribution</ILOTitle>

          <StairCard
            bg={StairBgImage}
            style={{
              background: '#0A0C1B',
            }}
          >
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
              background: '#0A0C1B',
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
