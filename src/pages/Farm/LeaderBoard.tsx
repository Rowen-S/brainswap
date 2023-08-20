import { StairCard } from 'components/StairCard'
import React from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Image, Text } from 'rebass'
import { Table } from 'components/Table'
import styled from 'styled-components'

import Rank0Image from '../../assets/images/rank_0.svg'
import Rank1Image from '../../assets/images/rank_1.svg'
import Rank2Image from '../../assets/images/rank_2.svg'
import Pagination from 'components/Pagination'

const TradingBoost = styled.span`
  border: 1px dashed #2cfff3;
  line-height: 25px;
  border-radius: 2px;
  padding: 5px 15px;
  color: #2cfff3;
`
const Sacrifice = styled.span`
  color: #2cfff3;
  font-size: 12px;
  line-height: 12px;
`
export default function Leaderboard() {
  return (
    <>
      <Text fontSize={28}>Genesis Epoch Trading Leaderboard</Text>
      <Text fontSize={14} mt={20} opacity={0.5}>
        Get to the top of the leaderboard in GENESIS EPOCH to determine your NEXT EPOCH trading boost
      </Text>

      <StairCard bg={StairBgImage}>
        <Table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>Trading Boost</th>
              <th>Volume</th>
              <th>Trading PTS</th>
              <th>Estimated rewards</th>
              <th>Sacrifice</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Image src={Rank0Image} />
              </td>
              <td>ERT67R</td>
              <td>
                <TradingBoost>x 3.0</TradingBoost>
              </td>
              <td>$98.35m</td>
              <td>999</td>
              <td>$10,456</td>
              <td>
                <Sacrifice>Comming soom</Sacrifice>
              </td>
            </tr>
            <tr>
              <td>
                <Image src={Rank1Image} />
              </td>
              <td>ERT67R</td>
              <td>
                <TradingBoost>x 3.0</TradingBoost>
              </td>
              <td>$98.35m</td>
              <td>999</td>
              <td>$10,456</td>
              <td>
                <Sacrifice>Comming soom</Sacrifice>
              </td>
            </tr>
            <tr>
              <td>
                <Image src={Rank2Image} />
              </td>
              <td>ERT67R</td>
              <td>
                <TradingBoost>x 3.0</TradingBoost>
              </td>
              <td>$98.35m</td>
              <td>999</td>
              <td>$10,456</td>
              <td>
                <Sacrifice>Comming soom</Sacrifice>
              </td>
            </tr>
          </tbody>
        </Table>
      </StairCard>

      <Pagination total={101} pageSize={50}></Pagination>
    </>
  )
}
