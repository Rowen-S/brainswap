import { ColumnCenter } from 'components/Column'
import React from 'react'
import styled from 'styled-components/macro'

interface ISupplyItemProps {
  title: string
  value: string
  desc: string
}

const SupplyItemTitle = styled.div`
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5;
`

const SupplyItemValue = styled.div`
  color: #ffffff;
  margin-top: 23px;
  text-align: center;
  font-size: 18px;
  font-weight: 500;
`

const SupplyItemDesc = styled.div`
  color: #ffffff;
  margin-top: 25px;
  text-align: center;
  font-size: 12px;
  line-height: 12px;
  font-weight: 500;
  opacity: 0.5;
`

const SupplyItemWrapper = styled(ColumnCenter)``

export default function SupplyItem(props: ISupplyItemProps) {
  return (
    <SupplyItemWrapper>
      <SupplyItemTitle>{props.title}</SupplyItemTitle>
      <SupplyItemValue>{props.value}</SupplyItemValue>
      <SupplyItemDesc>{props.desc}</SupplyItemDesc>
    </SupplyItemWrapper>
  )
}
