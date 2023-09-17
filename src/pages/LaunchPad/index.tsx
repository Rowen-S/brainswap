import { CurrencyAmount, Token } from '@uniswap/sdk-core'
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
import { uniClient } from 'lib/thegraph'
import { gql, useQuery } from '@apollo/client'
import Loader from 'components/Loader'
import { formatWithMod } from 'utils'
import QuestionHelper from 'components/QuestionHelper'

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
const lpLockTime = days * 24 * 60 * 60 * 1000

export default function LaunchPad() {
  const { library, chainId, account } = useWeb3React()
  const idoContract = useIDOContract()
  const iq = chainId ? IQ[chainId] : undefined

  const totalSupply: CurrencyAmount<Token> | undefined = useTotalSupply(iq)

  const idoSupply: BigNumber = useSingleCallResult(idoContract, 'totalInvestedETH', [])?.result?.[0]

  const { error, data: ethPriceValue } = useQuery(
    gql`
      {
        bundle(id: "1") {
          ethPriceUSD
        }
      }
    `,
    {
      client: uniClient,
    }
  )
  const ethPrice = useMemo(() => {
    if (!error && ethPriceValue && ethPriceValue.bundle && ethPriceValue.bundle.ethPriceUSD) {
      return JSBI.BigInt(Math.ceil(ethPriceValue.bundle.ethPriceUSD).toFixed(0))
    }
    return 0
  }, [error, ethPriceValue])

  let valueAmountInWETH: CurrencyAmount<Token> | undefined
  if (idoSupply && ethPrice && chainId) {
    valueAmountInWETH = CurrencyAmount.fromRawAmount(
      new Token(chainId, '0x0000000000000000000000000000000000000001', 18),
      JSBI.multiply(
        ethPrice,
        JSBI.divide(
          JSBI.multiply(JSBI.divide(JSBI.BigInt(idoSupply), JSBI.BigInt(2)), JSBI.BigInt(100)),
          JSBI.BigInt(10)
        )
      )
    )
  }

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

  const [{ endTimestamp, unlockTimestamp }, setInit] = useState<{
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
          <ILOTitle ml={15}>IQ Initial Launchpad Offerings</ILOTitle>
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
                  value: formatWithMod(totalSupply?.toSignificant(4) || 0),
                  suffix: 'IQ',
                }}
                desc=""
              />
              <SupplyItem
                title="ILO Supply"
                content={{
                  value: formatWithMod(totalSupply?.multiply(IDO_RATIO)?.toSignificant(4) || 0),
                  suffix: '[10%]',
                }}
                append={<QuestionHelper text="Initial LP Offering" />}
                desc=""
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
                desc=""
              />
              <SupplyItem
                title="FDV"
                content={{
                  value: `$${valueAmountInWETH && valueAmountInWETH?.toSignificant(6, { groupSeparator: ',' })}` ?? (
                    <Loader />
                  ),
                  suffix: 'USD',
                }}
              />
            </Row>
          </StairCard>

          <Text
            fontSize={14}
            maxWidth="80%"
            margin="0px auto"
            lineHeight={'24px'}
            textAlign={'center'}
            color="white"
            opacity="0.5"
          >
            *There is no Hardcap where the IQ price will continuously increase at every purchase. No matter when you
            participate, everyone will get IQ tokens at the same final price. The final IQ token you get will be: your
            ETH shares in offering pool * 10,000,000,000. If Total Raised doesn’t reach the Softcap, all raised ETH will
            be refunded. The ILO Supply IQ token will be claimable for all participated address according to the ETH
            share.
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
              <ConvertLP distance={claimLPPercent} />
            </StairCard>
          </OfferWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle ml={15}>Buy History</ILOTitle>

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
          <ILOTitle ml={15}>Token Distribution</ILOTitle>

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
            {`Before participating in the launch,you must confirm that you are not located, incorporated, or a citizen or
              resident of the United States of America,People's Republic of China, Bermuda, Burundi, Central African
              Republic, Cuba, Democratic Republic of Congo, Eritrea, Guinea-Bissau, Iran, Libya, Mali, North Korea,
              Palestine, Republic of Seychelles, Somalia, South Sudan, Sudan, Syria, Western Sahara,Yemen, Crimea and
              Sevastopol, or any other state, country, or jurisdiction where participation in this launch would be illegal
              according to applicable law. `}
            <br />

            {`Please ensure you understand the public sale mechanics and terms before proceeding, deposited amounts CANNOT be withdrawn.`}
          </StairCard>
        </SectionWrapper>
      </ContentWrapper>
    </PageWrapper>
  )
}
