import styled from 'styled-components'
import React from 'react'

const Input = styled.input`
  all: unset;
  border: 1px dashed #2cfff3;
  border-radius: 8px;
  margin-top: 30px;
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  padding: 0 20px;
  font-size: 14px;
  color: #2cfff3;
`

interface InputAmountProps {
  placeholder: string
}

export default function InputAmount(props: InputAmountProps) {
  return <Input placeholder={props.placeholder || 'input number'}></Input>
}
