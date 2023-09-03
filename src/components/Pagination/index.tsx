import { RowBetween, RowFixed } from 'components/Row'
import React, { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'react-feather'
import { Text } from 'rebass'
import styled from 'styled-components'
import { IconWrapper } from 'theme'

const ScrollPage = styled(RowFixed)``

const PageButton = styled(IconWrapper)`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid #ffffff;
  cursor: pointer;
`

interface PaginationProps {
  pageSize: number
  total: number
  onPrevPageClick?: (currentPage: number) => void
  onNextPageClick?: (currentPage: number) => void
}
export default function Pagination({ pageSize, total, onPrevPageClick, onNextPageClick }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(0)

  const pageCount = useMemo(() => {
    const mod = total % pageSize
    return mod === 0 ? total / pageSize : Math.floor(total / pageSize) + 1
  }, [pageSize, total])

  const onPrevPage = () => {
    if (currentPage <= 0) return
    setCurrentPage(currentPage - 1)
    onPrevPageClick && onPrevPageClick(currentPage - 1)
  }

  const onNextPage = () => {
    if (currentPage >= pageCount - 1) return
    setCurrentPage(currentPage + 1)
    onNextPageClick && onNextPageClick(currentPage + 1)
  }
  return (
    <RowBetween>
      <Text>
        {currentPage * pageSize + 1 === Math.min((currentPage + 1) * pageSize, total)
          ? `${currentPage * pageSize + 1} of ${total} `
          : `${currentPage * pageSize + 1} - ${Math.min((currentPage + 1) * pageSize, total)} of ${total}`}
      </Text>
      <ScrollPage justify="flex-end">
        <Text
          mr={20}
          css={{
            userSelect: 'none',
          }}
        >
          per page {pageSize}
        </Text>
        <PageButton
          stroke="#ffffff"
          marginRight="10px"
          onClick={onPrevPage}
          style={{
            opacity: currentPage === 0 ? 0.5 : 1,
            cursor: currentPage === 0 ? 'default' : 'pointer',
          }}
        >
          <ChevronLeft />
        </PageButton>
        <PageButton
          stroke="#ffffff"
          onClick={onNextPage}
          style={{
            opacity: currentPage === pageCount - 1 ? 0.5 : 1,
            cursor: currentPage === 0 ? 'default' : 'pointer',
          }}
        >
          <ChevronRight />
        </PageButton>
      </ScrollPage>
    </RowBetween>
  )
}
