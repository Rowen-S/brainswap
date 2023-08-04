import styled from 'styled-components'
import React from 'react'

export const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: seperate;
  border-spacing: 0px 10px;
`

export const THead = styled.thead`
  // custom css goes here
`

export const TFoot = styled.tfoot`
  // custom css goes here
`

export const TBody = styled.tbody`
  margin-top: 20px;
`

export const TR = styled.tr`
  background: rgba(32, 30, 43, 0.3);
  height: 68px;
  line-height: 68px;
  border-radius: 10px;
  td:first-child {
    border-bottom-left-radius: 10px;
  }
  td:last-child {
    border-bottom-right-radius: 10px;
  }
  td:first-child {
    border-top-left-radius: 10px;
  }
  td:last-child {
    border-top-right-radius: 10px;
  }
`

export const TH = styled.th`
  font-size: 12px;
  color: #2cfff3;
`

export const TD = styled.td`
  color: #ffffff;
  font-size: 16px;
  font-weight: 500;
`

type Children = React.ReactNode
interface TableRelativeProps {
  children: Children
  [key: string]: any
}

export const Table = ({ children, ...rest }: TableRelativeProps) => {
  return <StyledTable {...rest}>{children}</StyledTable>
}

Table.Head = ({ children, ...rest }: TableRelativeProps) => {
  return <THead {...rest}>{children}</THead>
}

Table.Body = ({ children, ...rest }: TableRelativeProps) => {
  return <TBody {...rest}>{children}</TBody>
}

Table.Foot = ({ children, ...rest }: TableRelativeProps) => {
  return <TFoot {...rest}>{children}</TFoot>
}

Table.TH = ({ children, ...rest }: TableRelativeProps) => {
  return <TH {...rest}>{children}</TH>
}

Table.TR = ({ children, ...rest }: TableRelativeProps) => {
  return <TR {...rest}>{children}</TR>
}

Table.TD = ({ children, ...rest }: TableRelativeProps) => {
  return <TD {...rest}>{children}</TD>
}
