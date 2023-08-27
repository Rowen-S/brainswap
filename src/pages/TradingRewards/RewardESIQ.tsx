import { StairCard } from 'components/StairCard'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import Row from 'components/Row'
import { ButtonNormal } from 'components/Button'
import { useUserHasAvailableMint } from 'state/farm/hooks'
import { useWeb3React } from '@web3-react/core'
import { useDropContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { formatEther } from '@ethersproject/units'
import { formatToFixed } from 'utils'

export default function RewardESIQ() {
  const { account } = useWeb3React()
  const dropContract = useDropContract()
  const { rewards, isClaimd } = useUserHasAvailableMint(account)

  const claim = useCallback(() => {
    if (rewards) {
      dropContract
        ?.claim(rewards.amount, rewards.proofs)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => console.log(err))
    }
  }, [dropContract, rewards])
  return (
    <StairCard
      bg={StairBgImage}
      style={{
        flexGrow: 1,
      }}
    >
      <Text fontSize={16}>My Trading rewards</Text>
      <Row align="flex-end" mt={40}>
        <Text fontSize={42}>{(rewards?.amount && formatToFixed(formatEther(rewards?.amount))) ?? '-'}</Text>
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

      <ButtonNormal mt={70} onClick={claim} disabled={isClaimd ?? true}>
        Claim All esIQ
      </ButtonNormal>
    </StairCard>
  )
}
