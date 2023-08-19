import styled from 'styled-components/macro'
import Row, { RowFixed } from 'components/Row'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ButtonNormal } from 'components/Button'
import { useIDOContract } from 'hooks/useContract'
import Progress from 'components/Progress'
import { formatEther } from 'ethers/lib/utils'

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
  const claimLp = useCallback(() => {
    idoContract
      ?.claimLP()
      .then(async (tx) => {
        await tx.wait()
      })
      .catch((err) => {
        console.error('err', err)
      })
  }, [idoContract])

  const isInvested = useMemo(() => {
    if (userInfo && userInfo.debt >= 0) {
      return Boolean(!userInfo.totalInvestedETH)
    }
    return true
  }, [userInfo])

  const [reverses, setReverses] = useState([0, 0])
  useEffect(() => {
    if (userInfo && idoContract) {
      // 5163977794943222513438
      idoContract.getLP((userInfo.total || 0) - (userInfo.debt || 0)).then(([reverse0, reverse1]) => {
        setReverses([Number(formatEther(reverse0)), Number(formatEther(reverse1))])
      })
    }
  }, [userInfo, idoContract])

  return (
    <>
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
            Your current LP: {reverses[0]} IQ + {reverses[1]} ETH
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

      <ButtonNormal width={'400px'} margin={'25px auto 0 auto'} disabled={isInvested} onClick={claimLp}>
        Claim unlocked LP
      </ButtonNormal>
    </>
  )
}
