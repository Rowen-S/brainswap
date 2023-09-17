import styled from 'styled-components/macro'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import Row, { RowBetween, RowFixed } from 'components/Row'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ButtonNormal } from 'components/Button'
import Input from 'components/NumericalInput'
import { AutoColumn } from 'components/Column'
import { useIDOContract } from 'hooks/useContract'
import { formatEther, parseEther } from '@ethersproject/units'
import { useETHBalances } from 'state/wallet/hooks'
import { useWeb3React } from '@web3-react/core'
import { Text } from 'rebass'
import QuestionHelper from 'components/QuestionHelper'
import { BigNumber } from 'ethers'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { IQ } from 'constants/tokens'
import { IDO_RATIO } from 'constants/misc'
import TransactionConfirmationModal, { ConfirmationModalContent } from 'components/TransactionConfirmationModal'

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
  isExpired?: boolean
  isbuy: boolean
  isRefund: boolean
  softCap: BigNumber
  investedEth: BigNumber
  onBuySucceed: () => void
  onRefundSucceed: () => void
}

export default function AddLP({
  userInfo,
  isExpired,
  isbuy,
  isRefund,
  softCap,
  investedEth,
  onBuySucceed,
  onRefundSucceed,
}: AddLPProps) {
  const { account, chainId } = useWeb3React()
  const idoContract = useIDOContract()
  const [idoValue, setIdoValue] = useState('')
  const [txHash, setTxHash] = useState<string>('')
  const [showConfirm, setShowConfirm] = useState<boolean>(false)

  const iq = chainId ? IQ[chainId] : undefined
  const totalSupply: CurrencyAmount<Token> | undefined = useTotalSupply(iq)

  const [initIQAmount, setInitIQAmount] = useState<CurrencyAmount<Token>>()
  useEffect(() => {
    if (userInfo && userInfo.totalInvestedETH && totalSupply && softCap && iq) {
      // totalSupply * 10%            IQ amount?
      //     softCap          userInfo.totalInvestedETH
      try {
        const idoSupply = parseEther(totalSupply.multiply(IDO_RATIO).toFixed(0))
        // setInitIQAmount(formatEther().toString())
        setInitIQAmount(CurrencyAmount.fromRawAmount(iq, userInfo.totalInvestedETH.mul(idoSupply).div(investedEth)))
      } catch (error) {
        setInitIQAmount(CurrencyAmount.fromRawAmount(iq, 0))
      }
    }
  }, [userInfo, totalSupply, softCap, iq, investedEth])

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  const buyIDO = useCallback(async () => {
    if (!idoValue) return

    idoContract
      ?.pay({ value: parseEther(idoValue) })
      .then(async (tx) => {
        setTxHash(tx.hash)
        setShowConfirm(true)
        await tx.wait()
        onBuySucceed && onBuySucceed()
      })
      .catch((err) => {
        console.error('err', err)
      })
      .finally(() => {
        setIdoValue('')
      })
  }, [idoContract, idoValue, onBuySucceed])

  const refundIDO = useCallback(() => {
    idoContract
      ?.refund()
      .then(async (tx) => {
        setTxHash(tx.hash)
        setShowConfirm(true)
        await tx.wait()
        onRefundSucceed && onRefundSucceed()
      })
      .catch((err) => {
        console.error('err', err)
      })
      .finally(() => {
        setIdoValue('')
      })
  }, [idoContract, onRefundSucceed])

  // console.log(isRefund, !Boolean(userInfo?.totalInvestedETH > 0))

  const percentInPool = useMemo(() => {
    if (userInfo && userInfo.totalInvestedETH && investedEth) {
      return Math.floor(userInfo.totalInvestedETH.div(investedEth) * 100)
    }

    return 0
  }, [userInfo, investedEth])

  return (
    <>
      <TransactionConfirmationModal
        isOpen={showConfirm}
        onDismiss={() => setShowConfirm(false)}
        attemptingTxn={false}
        hash={txHash}
        content={() => (
          <ConfirmationModalContent
            title="Adding LP..."
            onDismiss={() => setShowConfirm(false)}
            topContent={() => <div></div>}
            bottomContent={() => <div></div>}
          />
        )}
        pendingText={''}
      />
      <ILOCardTitle>Add IQ LP Offering</ILOCardTitle>
      <RowFixed
        style={{
          marginTop: '20px',
        }}
      >
        <ILOCardText fontSize={16}>50% buy IQ + 50% ETH = IQ LP</ILOCardText>
      </RowFixed>
      <AutoColumn gap="40px" justify="center">
        <RowBetween
          style={{
            marginTop: '30px',
          }}
        >
          <ILOCardText fontSize={14}>Balance: {userEthBalance?.toSignificant(4)} ETH</ILOCardText>
          <ILOCardText fontSize={14}>
            Allocation: {userInfo?.totalInvestedETH ? formatEther(userInfo?.totalInvestedETH) : '-'} ETH{' '}
            {`[${percentInPool}% in pool]`}
          </ILOCardText>
        </RowBetween>

        {isRefund && !isbuy ? (
          <IDDWrapper gap="sm">
            <ILOCardText fontSize={14}>*When softcap miss, click ‘refund’ to get your ETH and IQ airdrop </ILOCardText>
            <ButtonNormal
              disabled={isRefund && !Boolean(userInfo?.totalInvestedETH > 0)}
              onClick={refundIDO}
              style={{
                marginTop: '32px',
              }}
            >
              Refund
            </ButtonNormal>
          </IDDWrapper>
        ) : (
          <>
            <IDDWrapper gap="md">
              <IDOInput value={idoValue} onUserInput={(val) => setIdoValue(val)} disabled={isExpired} />
              <ILOCardText as={Row} fontSize={12}>
                Your initial LP:{' '}
                {/* {isExpired ? (
                  initIQAmount?.toFixed(2)
                ) : (
                  <>
                    <QuestionHelper text="The final IQ you purchased will be confirmed when the launchpad is finished." />
                    &nbsp;
                  </>
                )} */}
                {initIQAmount?.toFixed(2) + 'IQ'}
                <QuestionHelper
                  text="The final IQ you purchased will be confirmed when the launchpad is finished."
                  size={10}
                />
                &nbsp;+ {userInfo?.totalInvestedETH ? formatEther(userInfo?.totalInvestedETH.div(2)) : '0'} ETH LP
              </ILOCardText>
            </IDDWrapper>
            <ButtonNormal disabled={(!idoValue && !isbuy) || isExpired} onClick={buyIDO}>
              Buy
            </ButtonNormal>
          </>
        )}
      </AutoColumn>
    </>
  )
}
