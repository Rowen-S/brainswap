import { ColumnCenter } from 'components/Column'
import React, { ReactNode } from 'react'
import styled from 'styled-components/macro'

interface ISupplyItemProps {
  title: string
  content: {
    value: string | ReactNode
    suffix: string
  }
  desc?: string
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

// const SupplyItemDesc = styled.div`
//   color: #ffffff;
//   margin-top: 25px;
//   text-align: center;
//   font-size: 12px;
//   line-height: 12px;
//   font-weight: 500;
//   opacity: 0.5;
// `

const SupplyItemWrapper = styled(ColumnCenter)``

export default function SupplyItem({ title, content }: ISupplyItemProps) {
  return (
    <SupplyItemWrapper>
      <SupplyItemTitle>{title}</SupplyItemTitle>
      <SupplyItemValue>
        {content?.value} {content.suffix}
      </SupplyItemValue>
      {/* <SupplyItemDesc>{desc}</SupplyItemDesc> */}
    </SupplyItemWrapper>
  )
}
