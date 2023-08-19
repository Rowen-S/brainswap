import styled from 'styled-components/macro'

import Row, { RowBetween, RowFixed } from 'components/Row'
import { useCallback, useState } from 'react'
import { ButtonNormal } from 'components/Button'
import Input from 'components/NumericalInput'
import { AutoColumn } from 'components/Column'
import { useIDOContract } from 'hooks/useContract'
import { formatEther, parseEther } from '@ethersproject/units'
import { useETHBalances } from 'state/wallet/hooks'
import { useWeb3React } from '@web3-react/core'
import { Text } from 'rebass'
import QuestionHelper from 'components/QuestionHelper'

const ILOCardTitle = styled(Row)`
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
`
const ILOCardText = styled(Text)`
  color: #ffffff;
  opacity: 0.5;
`
const IDDWrapper = styled(AutoColumn)`
  width: 100%;
`
const IDOInput = styled(Input)`
  background: transparent;
  border-radius: 8px;
  border: 1px dashed ${({ theme }) => theme.bg6};
  color: ${({ theme }) => theme.bg6};
  padding: 18px 20px;
  width: 100%;
  font-size: 14px;
  &:disabled {
    cursor: not-allowed;
  }
`
interface AddLPProps {
  userInfo: any
  isExpired: boolean
  isbuy: boolean
  isRefund: boolean
  onBuySucceed: () => void
  onRefundSucceed: () => void
}

export default function AddLP({ userInfo, isExpired, isbuy, isRefund, onBuySucceed, onRefundSucceed }: AddLPProps) {
  const { account } = useWeb3React()
  const idoContract = useIDOContract()
  const [idoValue, setIdoValue] = useState('')

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const buyIDO = useCallback(() => {
    if (!idoValue) return

    idoContract
      ?.pay({ value: parseEther(idoValue) })
      .then((res) => {
        onBuySucceed && onBuySucceed()
      })
      .catch((err) => {
        console.error('err', err)
      })
      .finally(() => {
        setIdoValue('')
      })
  }, [idoContract, idoValue])

  const refundIDO = useCallback(() => {
    idoContract
      ?.refund()
      .then((res) => {
        onRefundSucceed && onRefundSucceed()
      })
      .catch((err) => {
        console.error('err', err)
      })
      .finally(() => {
        setIdoValue('')
      })
  }, [idoContract])

  // console.log(isRefund, !Boolean(userInfo?.totalInvestedETH > 0))

  return (
    <>
      <ILOCardTitle>Add IQ LP offering</ILOCardTitle>
      <RowFixed
        style={{
          marginTop: '20px',
        }}
      >
        <ILOCardText fontSize={16}>50% buy IQ + 50% ETH = IQ LP Half money, full token</ILOCardText>
      </RowFixed>
      <AutoColumn gap="40px" justify="center">
        <RowBetween
          style={{
            marginTop: '30px',
          }}
        >
          <ILOCardText fontSize={14}>Balance: {userEthBalance?.toSignificant(4)} ETH</ILOCardText>
          <ILOCardText fontSize={14}>
            Allocation: {userInfo?.totalInvestedETH ? formatEther(userInfo?.totalInvestedETH) : '-'} ETH
          </ILOCardText>
        </RowBetween>

        {isbuy ? (
          <>
            <IDDWrapper gap="md">
              <IDOInput value={idoValue} onUserInput={(val) => setIdoValue(val)} disabled={isExpired} />
              <ILOCardText as={Row} fontSize={12}>
                Your initial LP
                <QuestionHelper text="The final IQ you purchased will be confirmed when the launchpad is finished." />:
                IQ + {userInfo?.totalInvestedETH ? formatEther(userInfo?.totalInvestedETH.div(2)) : '-'}ETH LP
              </ILOCardText>
            </IDDWrapper>
            <ButtonNormal disabled={(!idoValue && !isbuy) || isExpired} onClick={buyIDO}>
              Buy
            </ButtonNormal>
          </>
        ) : isRefund ? (
          <IDDWrapper gap="sm">
            <ILOCardText fontSize={14}>*When softcap miss, click ‘refund’ to get your ETH and IQ airdrop </ILOCardText>
            <ButtonNormal disabled={isRefund && !Boolean(userInfo?.totalInvestedETH > 0)} onClick={refundIDO}>
              Refund
            </ButtonNormal>
          </IDDWrapper>
        ) : null}
      </AutoColumn>
    </>
  )
}
