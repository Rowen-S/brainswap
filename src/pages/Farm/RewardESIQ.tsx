import { StairCard } from 'components/StairCard'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Row from 'components/Row'
import { ButtonNormal } from 'components/Button'
import { useUserRewardListData } from 'state/farm/hooks'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components/macro'

export default function RewardESIQ() {
  const { account } = useWeb3React()
  const reward = useUserRewardListData(account)

  const RewardText = styled(Text)`
    /* width: 160px;
    text-overflow: ellipsis;
    overflow: hidden; */
  `
  return (
    <StairCard
      bg={StairBgImage}
      style={{
        flexGrow: 1,
      }}
    >
      <Text fontSize={16}>My Trading rewards</Text>
      <Row align="flex-end" mt={40}>
        <RewardText fontSize={42}>{reward?.amount ?? '-'}</RewardText>
        <Text
          fontSize={16}
          opacity={0.5}
          marginLeft={10}
          style={{
            position: 'relative',
            top: '-6px',
          }}
        >
          esIQ200
        </Text>
      </Row>

      <Text fontSize={14} opacity={0.5} mt={36}>
        The token will be claimable this epoch. The unclaimed token will be expired after epoch
      </Text>

      <ButtonNormal mt={70}>Claim All esIQ200</ButtonNormal>
    </StairCard>
  )
}
