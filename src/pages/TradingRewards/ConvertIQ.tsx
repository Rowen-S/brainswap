import { StairCard } from 'components/StairCard'
import { useCallback, useMemo, useState } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Box, Text } from 'rebass'
import { RowBetween, RowFixed } from 'components/Row'
import { ButtonNormal, ButtonOutlined } from 'components/Button'
import { useTokenBalance } from 'state/wallet/hooks'
import { useWeb3React } from '@web3-react/core'
import { formatTokenAmount } from 'utils/formatTokenAmount'
import { ES_IQ, IQ } from 'constants/tokens'
import { ProgressSlider } from 'components/Slider'
import { useEsTokenContract } from 'hooks/useContract'
import { toHex } from '@uniswap/v3-sdk'
import useTheme from 'hooks/useTheme'
import { unwrappedToken } from 'utils/unwrappedToken'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { StyledLogo } from './RewardESIQ'
import { CheckCircle } from 'react-feather'
import MetaMaskLogo from '../../assets/images/metamask.png'

export default function ConvertIQ() {
  const theme = useTheme()

  const { account, chainId } = useWeb3React()

  const currencyIQ = unwrappedToken(IQ[chainId ?? 80001])

  const { addToken, success } = useAddTokenToMetamask(currencyIQ)

  const esIqBalance = useTokenBalance(account ?? undefined, chainId ? ES_IQ[chainId] : undefined)

  const esTokenContract = useEsTokenContract()
  const [day, setDay] = useState(3)

  const ratio = useMemo(() => (100 / 14) * day, [day])

  const balanceRatio = useMemo(
    () => esIqBalance && ratio && esIqBalance.multiply(Math.floor(ratio * 100)).divide(10000),
    [esIqBalance, ratio]
  )

  let isconvert

  if (balanceRatio && Boolean(balanceRatio)) {
    isconvert = Boolean(balanceRatio && !balanceRatio.equalTo(0))
  }

  const convert = useCallback(() => {
    if (esIqBalance) {
      esTokenContract?.redeem(toHex(esIqBalance.quotient), Math.floor(day * 24 * 3600)).catch((err) => console.log(err))
    }
  }, [day, esIqBalance, esTokenContract])

  function convertToFormattedString(days: number) {
    const totalHours = days * 24
    const wholeDays = Math.floor(totalHours / 24)
    const remainingHours = totalHours % 24

    return `${wholeDays}D ${remainingHours.toFixed(1)}H`
  }
  return (
    <StairCard bg={StairBgImage}>
      <Text fontSize={16}>Convert To IQ Token</Text>
      <RowBetween mt={25}>
        <Text fontSize={12} opacity={0.5}>
          Select IQ Lock Times: 14 days
        </Text>
        <Text fontSize={12} opacity={0.5}>
          Balance {formatTokenAmount(esIqBalance, 4)} esIQ
        </Text>
      </RowBetween>
      <Box mt={20}>
        <ProgressSlider min={3} max={14} value={day} size={40} step={0.5} onChange={setDay} />
      </Box>

      <RowBetween mt={10}>
        <Text fontSize={12} opacity={0.5}>
          3 Days
        </Text>
        <Text fontSize={12} opacity={0.5}>
          14 days
        </Text>
      </RowBetween>

      <Box fontSize={12} mt={20} display="flex" alignItems={'center'}>
        <Text opacity={0.5}>You will receive </Text>
        &#20;
        <Text fontSize={16} color={theme.bg6}>
          {`${balanceRatio && balanceRatio.toSignificant(4, { visualViewport: ',' })}   IQ [${ratio.toFixed(2)}%]`}{' '}
        </Text>
        <ButtonOutlined padding="6px" width="fit-content" onClick={addToken} style={{ marginLeft: '6px' }}>
          {!success ? (
            <StyledLogo src={MetaMaskLogo} />
          ) : (
            <RowFixed>
              <CheckCircle size={'16px'} stroke={'#2CFFF3'} />
            </RowFixed>
          )}
        </ButtonOutlined>
        &#20;
        <Text opacity={0.5}>in {convertToFormattedString(day)}</Text>
      </Box>

      <Text fontSize={12} opacity={0.5} mt={20}>
        And the remainning token will be burnt
      </Text>

      <ButtonNormal m={'auto'} mt={30} maxWidth={558} disabled={!isconvert} onClick={convert}>
        Convert
      </ButtonNormal>
    </StairCard>
  )
}
