import { ReactNode } from 'react'
import styled from 'styled-components'

export const StyledTable = styled.table`
  width: 100%;
  text-align: center;
  border-collapse: seperate;
  border-spacing: 0px 10px;

  & > thead {
    th {
      font-size: 12px;
      color: ${({ theme }) => theme.bg6};
    }
  }
  & > tbody {
    margin-top: 20px;
    tr {
      background: rgba(32, 30, 43, 0.3);
      height: 68px;
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
      td {
        color: #ffffff;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
`

interface TableRelativeProps {
  children: ReactNode
  [key: string]: any
}

export const Table = ({ children, ...rest }: TableRelativeProps) => {
  return <StyledTable {...rest}>{children}</StyledTable>
}
