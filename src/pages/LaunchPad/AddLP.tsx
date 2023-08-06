import styled from 'styled-components/macro'

import Row, { RowBetween, RowFixed } from 'components/Row'
import { useCallback, useState } from 'react'
import { ButtonNormal } from 'components/Button'
import Input from 'components/NumericalInput'
import { AutoColumn } from 'components/Column'
import { useIDOContract } from 'hooks/useContract'
import { parseEther } from '@ethersproject/units'

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
  font-size: 14px;
  opacity: 0.5;
`

const IDOInput = styled(Input)`
  background: transparent;
  border-radius: 8px;
  border: 1px dashed #2cfff3;
  color: #2cfff3;
  padding: 18px 20px;
  width: 100%;
  font-size: 14px;
`

export default function AddLP() {
  const idoContract = useIDOContract()
  const [idoValue, setIdoValue] = useState('')

  const buyIDO = useCallback(() => {
    if (!idoValue) return

    idoContract
      ?.pay({ value: parseEther(idoValue) })
      .then((res) => {
        console.log('success', res)
      })
      .catch((err) => {
        console.error('err', err)
      })
      .finally(() => {
        setIdoValue('')
      })
  }, [idoContract, idoValue])

  return (
    <>
      <ILOCardTitle>Add IQ200 LP offering</ILOCardTitle>
      <RowFixed
        style={{
          marginTop: '20px',
        }}
      >
        <ILOCardMidTitle>Take rhe faster way to get BRAINSWAP platform token</ILOCardMidTitle>
      </RowFixed>

      <AutoColumn gap="40px" justify="center">
        <RowBetween
          style={{
            marginTop: '30px',
          }}
        >
          <ILOCardSmallTitle>Balance 200 ETH</ILOCardSmallTitle>
          <ILOCardSmallTitle>Allocation 10 ETH</ILOCardSmallTitle>
        </RowBetween>

        <IDOInput value={idoValue} onUserInput={(val) => setIdoValue(val)} />

        <ButtonNormal disabled={!idoValue} marginTop={40} width={'400px'} onClick={buyIDO}>
          Add ETH and claim IQ200/ETH esLP
        </ButtonNormal>
      </AutoColumn>
    </>
  )
}
