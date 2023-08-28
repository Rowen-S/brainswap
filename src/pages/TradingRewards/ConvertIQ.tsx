import { StairCard } from 'components/StairCard'
import { useCallback, useMemo, useState } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Box, Text } from 'rebass'
import { RowBetween } from 'components/Row'
import { ButtonNormal } from 'components/Button'
import { useTokenBalance } from 'state/wallet/hooks'
import { useWeb3React } from '@web3-react/core'
import { formatTokenAmount } from 'utils/formatTokenAmount'
import { ES_IQ } from 'constants/tokens'
import { ProgressSlider } from 'components/Slider'
import { useEsTokenContract } from 'hooks/useContract'

export default function ConvertIQ() {
  const { account, chainId } = useWeb3React()
  const esIqBalance = useTokenBalance(account ?? undefined, chainId ? ES_IQ[chainId] : undefined)

  const esTokenContract = useEsTokenContract()
  const [day, setDay] = useState(3)

  const ratio = useMemo(() => (100 / 14) * day, [day])

  const balanceRatio = useMemo(
    () => esIqBalance && ratio && esIqBalance.multiply(ratio.toFixed(0)),
    [esIqBalance, ratio]
  )

  let isconvert

  if (balanceRatio && Boolean(balanceRatio)) {
    isconvert = Boolean(balanceRatio && !balanceRatio.equalTo(0))
  }

  const convert = useCallback(() => {
    if (balanceRatio) {
      esTokenContract?.redeem(balanceRatio.quotient.toString(), day).catch((err) => console.log(err))
    }
  }, [balanceRatio, day, esTokenContract])

  return (
    <StairCard bg={StairBgImage}>
      <Text fontSize={16}>Convert to IQ token</Text>
      <RowBetween mt={25}>
        <Text fontSize={12} opacity={0.5}>
          Select IQ Lock Times: 30 days
        </Text>
        <Text fontSize={12} opacity={0.5}>
          Balance {formatTokenAmount(esIqBalance, 4)} esIQ200
        </Text>
      </RowBetween>
      <Box mt={20}>
        <ProgressSlider min={3} max={14} value={day} size={40} step={0.1} onChange={setDay} />
      </Box>

      <RowBetween mt={30}>
        <Text fontSize={12} opacity={0.5}>
          3 Days
        </Text>
        <Text fontSize={12} opacity={0.5}>
          14 days
        </Text>
      </RowBetween>

      <Box fontSize={12} mt={20} display="flex">
        <Text opacity={0.5}>You will receive </Text>
        &#20;
        <Text>
          {`${balanceRatio && balanceRatio.toSignificant(4, { visualViewport: ',' })}   IQ200[${ratio.toFixed(2)}%]`}{' '}
        </Text>
        &#20;
        <Text opacity={0.5}>in 3d 12h</Text>
      </Box>

      <Text fontSize={12} opacity={0.5} mt={20}>
        And the remainning token will be transferred to Treasure
      </Text>

      <ButtonNormal m={'auto'} mt={30} maxWidth={558} disabled={!isconvert} onClick={convert}>
        Convert
      </ButtonNormal>
    </StairCard>
  )
}
