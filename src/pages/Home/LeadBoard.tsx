import React from 'react'
import styled from 'styled-components'
import Column from 'components/Column'
import LeadBoardTitleImage from '../../assets/images/home/leadboard_title.png'
import { TBody, TD, TH, THead, TR, Table } from 'components/Table'
import { StairCard } from 'components/StairCard'
import LeadBoardBgImage from '../../assets/images/home/leadboard_bg.svg'

const LeadBoardWrapper = styled(Column)`
  margin-top: 0;
  margin: 0 auto;
  max-width: 1280px;
  margin-top: 100px;
`
const LeadBoardTitle = styled.div`
  display: flex;
  justify-content: center;
`
export default function LeadBoard() {
  return (
    <LeadBoardWrapper>
      {' '}
      <LeadBoardTitle
        style={{
          textAlign: 'center',
        }}
      >
        <img src={LeadBoardTitleImage} width={990}></img>
      </LeadBoardTitle>
      <StairCard
        bg={LeadBoardBgImage}
        style={{
          marginTop: '50px',
          background: 'transparent',
        }}
      >
        <Table>
          <THead>
            <TH>Rank</TH>
            <TH>Address</TH>
            <TH>Trading Boost</TH>
            <TH>Volume</TH>
            <TH>Trading IQ </TH>
            <TH>Estimated rewards</TH>
            <TH>Red bull</TH>
          </THead>
          <TBody>
            <TR>
              <TD>2123</TD>
              <TD>1223</TD>
              <TD>asdasd</TD>
              <TD>asdasd</TD>
              <TD>asdasd</TD>
              <TD>asdasd</TD>
              <TD
                style={{
                  maxWidth: '50px',
                }}
              >
                <span
                  style={{
                    color: '#2CFFF3',
                    lineHeight: '12px',
                  }}
                >
                  Drink 50 IQ to upgrade Boost!
                </span>
              </TD>
            </TR>
          </TBody>
        </Table>
      </StairCard>
    </LeadBoardWrapper>
  )
}
