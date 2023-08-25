import styled from 'styled-components/macro'
import Row, { RowFixed } from 'components/Row'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ButtonNormal } from 'components/Button'
import { useIDOContract } from 'hooks/useContract'
import Progress from 'components/Progress'
import { formatEther } from 'ethers/lib/utils'
import { useWeb3React } from '@web3-react/core'
import { BigNumber } from 'ethers'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/TransactionConfirmationModal'

const ILOCardTitle = styled(Row)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`
const ILOCardMidTitle = styled.div`
  color: #ffffff;
  font-size: 16px;
  opacity: 0.5;
`
const ILOCardSmallTitle = styled.div`
  color: #ffffff;
  font-size: 12px;
  opacity: 0.5;
`

const ILOCardSimpleText = styled.div`
  color: #ffffff;
  font-size: 14px;
`

const LockWrapper = styled.div`
  margin-top: 50px;
`

export default function ConvertLP({ userInfo, distance = 0 }: { userInfo: any; distance: number }) {
  const idoContract = useIDOContract()
  const { account } = useWeb3React()
  const [txHash, setTxHash] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const [realUserInfo, setRealUserInfo] = useState<{
    debt: BigNumber
    total: BigNumber
    amount: BigNumber
  }>({
    debt: BigNumber.from(0),
    total: BigNumber.from(0),
    amount: BigNumber.from(0),
  })

  const isInvested = useMemo(() => {
    if (realUserInfo && realUserInfo.debt.gt(0)) {
      return true
    }
    return false
  }, [realUserInfo])

  const getRealUserInfo = useCallback(async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const userInfo = await idoContract.getUserInfo(account!)
      setRealUserInfo({
        debt: userInfo[1],
        total: userInfo[0],
        amount: userInfo[2],
      })
    } catch (e) {
      setRealUserInfo({
        debt: BigNumber.from(0),
        total: BigNumber.from(0),
        amount: BigNumber.from(0),
      })
    }
  }, [account, idoContract])

  useEffect(() => {
    if (account && idoContract) {
      getRealUserInfo()
      getLP()
    }
  }, [account, idoContract, getRealUserInfo])

  const [totalReverses, setTotalReverses] = useState<[BigNumber, BigNumber]>([BigNumber.from(0), BigNumber.from(0)])

  const [unLockedReverses, setUnLockedReverses] = useState<[BigNumber, BigNumber]>([
    BigNumber.from(0),
    BigNumber.from(0),
  ])

  const getLP = useCallback(() => {
    if (idoContract) {
      // 5163977794943222513438  realUserInfo.total - (realUserInfo.debt || 0)
      idoContract.getLP(realUserInfo.total).then(([reverse0, reverse1]) => {
        setTotalReverses([reverse0, reverse1])
      })
      idoContract.getLP(realUserInfo.amount).then(([reverse0, reverse1]) => {
        setUnLockedReverses([reverse0, reverse1])
      })
    }
  }, [idoContract, realUserInfo])

  useEffect(() => {
    getLP()
  }, [idoContract, realUserInfo])

  const claimLp = useCallback(() => {
    idoContract
      ?.claimLP()
      .then(async (tx) => {
        setTxHash(tx.hash)
        setShowConfirm(true)
        await tx.wait()
        getRealUserInfo()
        getLP()
      })
      .catch((err) => {
        console.error('err', err)
      })
  }, [idoContract, getRealUserInfo])
  return (
    <>
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={() => setShowConfirm(false)}
        attemptingTxn={false}
        hash={txHash}
        content={() => (
          <ConfirmationModalContent
            title="Claiming LP..."
            onDismiss={() => setShowConfirm(false)}
            topContent={() => <div></div>}
            bottomContent={() => <div></div>}
          />
        )}
        pendingText={''}
      />
      <ILOCardTitle>Claim IQ/ETH LP</ILOCardTitle>
      <RowFixed
        style={{
          marginTop: '20px',
        }}
      >
        <ILOCardMidTitle>50% LP will be unlocked in 7 days, 100% will be unlocked in 14 days</ILOCardMidTitle>
      </RowFixed>

      <div
        style={{
          marginTop: '30px',

          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}
      >
        <ILOCardSimpleText
          style={{
            textAlign: 'left',
          }}
        >
          0%
        </ILOCardSimpleText>
        <ILOCardSimpleText
          style={{
            textAlign: 'center',
          }}
        >
          14Days (50%)
        </ILOCardSimpleText>
        <ILOCardSimpleText
          style={{
            textAlign: 'right',
          }}
        >
          28Days (100%)
        </ILOCardSimpleText>
      </div>

      <div
        style={{
          marginTop: '24px',
        }}
      >
        <Progress progress={distance}></Progress>
      </div>

      <LockWrapper>
        <Row>
          {/* <LockIcon src={LockSvg} /> */}
          <ILOCardSmallTitle>
            Your unlocked LP:{' '}
            {parseFloat(formatEther(unLockedReverses[1]))
              .toFixed(4)
              .replace(/\.?0+$/, '')}{' '}
            IQ +{' '}
            {parseFloat(formatEther(unLockedReverses[0]))
              .toFixed(4)
              .replace(/\.?0+$/, '')}{' '}
            ETH
          </ILOCardSmallTitle>
        </Row>

        <Row mt={10}>
          {/* <LockIcon src={LockSvg} /> */}
          <ILOCardSmallTitle>
            Your total LP:{' '}
            {parseFloat(formatEther(totalReverses[1]))
              .toFixed(4)
              .replace(/\.?0+$/, '')}{' '}
            IQ +{' '}
            {parseFloat(formatEther(totalReverses[0]))
              .toFixed(4)
              .replace(/\.?0+$/, '')}{' '}
            ETH
          </ILOCardSmallTitle>
        </Row>

        <Row
          style={{
            marginTop: '16px',
          }}
        >
          {/* <UnLockIcon src={unLockSvg} /> */}
          <ILOCardSmallTitle
            style={{
              lineHeight: '24px',
            }}
          >
            Note: Due to the automated market maker (AMM), your IQ and ETH in LP pool will be changed constantly after
            every swap.
          </ILOCardSmallTitle>
        </Row>
      </LockWrapper>

      <ButtonNormal width={'400px'} margin={'25px auto 0 auto'} disabled={!isInvested} onClick={claimLp}>
        Claim unlocked LP
      </ButtonNormal>
    </>
  )
}
