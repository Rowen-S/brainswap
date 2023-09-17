import { StairCard } from 'components/StairCard'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Row, { RowFixed } from 'components/Row'
import { rewardsPool } from 'constants/misc'
import { ButtonOutlined } from 'components/Button'
import { StyledLogo } from './RewardESIQ'
import MetaMaskLogo from '../../assets/images/metamask.png'
import { unwrappedToken } from 'utils/unwrappedToken'
import useAddTokenToMetamask from 'hooks/useAddTokenToMetamask'
import { IQ } from 'constants/tokens'
import { useWeb3React } from '@web3-react/core'
import { CheckCircle } from 'react-feather'

export default function RewardPool() {
  const { chainId } = useWeb3React()
  const currencyIQ = unwrappedToken(IQ[chainId ?? 80001])

  const { addToken, success } = useAddTokenToMetamask(currencyIQ)

  return (
    <StairCard
      bg={StairBgImage}
      style={{
        minWidth: '380px',
        position: 'relative',
        top: '6px',
      }}
    >
      <Text fontSize={16}>The Rewards Pool</Text>

      <Row
        style={{
          marginTop: '10px',
        }}
        align="flex-end"
      >
        <Text fontSize={42}>{rewardsPool.toLocaleString()}</Text>
        <Text
          opacity={0.5}
          fontSize={16}
          ml={10}
          style={{
            position: 'relative',
            top: '-6px',
          }}
        >
          IQ
        </Text>
        <ButtonOutlined padding="6px" width="fit-content" onClick={addToken} style={{ marginLeft: '6px' }}>
          {!success ? (
            <StyledLogo src={MetaMaskLogo} />
          ) : (
            <RowFixed>
              Added {currencyIQ.symbol} <CheckCircle size={'16px'} stroke={'#2CFFF3'} />
            </RowFixed>
          )}
        </ButtonOutlined>
      </Row>
      <Text opacity={0.5} fontSize={14} mt={10}>
        will be distributed this epoch
      </Text>
    </StairCard>
  )
}
