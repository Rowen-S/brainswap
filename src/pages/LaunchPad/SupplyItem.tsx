import { ColumnCenter } from 'components/Column'
import Row from 'components/Row'
import React, { ReactNode } from 'react'
import styled from 'styled-components/macro'

interface ISupplyItemProps {
  title: string
  content: {
    value: string | ReactNode
    suffix: string
  }
  append?: ReactNode
  desc?: string
}

const SupplyItemTitle = styled(Row)`
  color: #ffffff;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  opacity: 0.5;
  align-items: center;
  height: 13px;
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

const SupplyItemWrapper = styled(ColumnCenter)`
  justify-content: space-between;
  height: 58px;
`

export default function SupplyItem({ title, content, append }: ISupplyItemProps) {
  return (
    <SupplyItemWrapper>
      <SupplyItemTitle justify="center">
        {title}
        {append && (
          <span
            style={{
              marginLeft: '5px',
            }}
          >
            {append}
          </span>
        )}
      </SupplyItemTitle>
      <SupplyItemValue>
        {content?.value} {content.suffix}
      </SupplyItemValue>
      {/* <SupplyItemDesc>{desc}</SupplyItemDesc> */}
    </SupplyItemWrapper>
  )
}
