import { TBody, TD, TH, THead, TR, Table } from 'components/Table'
import React from 'react'

export default function LPHistory() {
  return (
    <Table>
      <THead>
        <TH>No.</TH>
        <TH>Type</TH>
        <TH>Hash</TH>
        <TH>Amount</TH>
        <TH>Status</TH>
        <TH>Time</TH>
      </THead>
      <TBody>
        <TR>
          <TD>2123</TD>
          <TD>1223</TD>
          <TD>asdasd</TD>
          <TD>asdasd</TD>
          <TD>asdasd</TD>
          <TD>asdasd</TD>
        </TR>

        <TR>
          <TD>2123</TD>
          <TD>1223</TD>
          <TD>asdasd</TD>
          <TD>asdasd</TD>
          <TD>asdasd</TD>
          <TD>asdasd</TD>
        </TR>
      </TBody>
    </Table>
  )
}
