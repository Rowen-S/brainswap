import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import { RowBetween } from 'components/Row'
import { Table } from 'components/Table'
import { ButtonNormal } from 'components/Button'

export default function VestingHistory() {
  return (
    <>
      <RowBetween>
        <Text fontSize={28}>Vesting in progress</Text>
        <Text fontSize={20}>Available 0 MEME</Text>
      </RowBetween>
      <StairCard bg={StairBgImage}>
        <Table>
          <thead>
            <tr>
              <th>Start from</th>
              <th>Duration</th>
              <th>Countdown</th>
              <th>Ratio</th>
              <th>Final amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>5/26 2023 14:00:45 </td>
              <td>7 days</td>
              <td>2 days</td>
              <td>50%</td>
              <td>163,456,789 MEME</td>
            </tr>
          </tbody>
        </Table>
        <ButtonNormal m={'auto'} mt={10} maxWidth={558}>
          Redeem all token
        </ButtonNormal>
      </StairCard>
    </>
  )
}
