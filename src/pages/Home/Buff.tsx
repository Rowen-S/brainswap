import React from 'react'
import Buff_1_Image from '../../assets/images/buff_1.png'
import Buff_2_Image from '../../assets/images/buff_2.png'
import Buff_3_Image from '../../assets/images/buff_3.png'

import Buff_1_Bean_Image from '../../assets/images/home/buff_1_bean.png'
import Buff_2_Bean_Image from '../../assets/images/home/buff_2_bean.png'
import Buff_3_Bean_Image from '../../assets/images/home/buff_3_bean.png'

import BuffTitleImage from '../../assets/images/home/buff_title.png'

import styled from 'styled-components'
import BuffItem from './BuffItem'
import Column from 'components/Column'

const BuffWrapper = styled(Column)`
  margin-top: 0;
  margin: 0 auto;
  max-width: 1280px;
`

const BuffTitle = styled.div`
  display: flex;
  justify-content: center;
`

const BuffItems = styled.div`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 36px;
  max-width: 1280px;
`
const items_data = [
  {
    bg: Buff_1_Image,
    left: 'Left 3,000 NFT',
    bean: Buff_1_Bean_Image,
    pill_name: 'Superman Pill',
    pill_amount_eth: 0.99,
    color: '#FF2A51',
    bg_color: 'rgba(255, 42, 81, 0.2)',
    boosts: [
      { name: 'Trading rewards', amount: 'x 0.3' },
      { name: 'Referral rewards', amount: 'x 0.3' },
      { name: 'Sacrifice Reimbursement ', amount: 'x 1.0' },
    ],
  },
  {
    bg: Buff_2_Image,
    left: 'Left 3,000 NFT',
    bean: Buff_2_Bean_Image,
    pill_name: 'Superman Pill',
    pill_amount_eth: 0.99,
    color: '#0044CC',
    bg_color: 'rgba(0, 68, 204, 0.2)',
    boosts: [
      { name: 'Trading rewards', amount: 'x 0.3' },
      { name: 'Referral rewards', amount: 'x 0.3' },
      { name: 'Sacrifice Reimbursement ', amount: 'x 1.0' },
    ],
  },
  {
    bg: Buff_3_Image,
    left: 'Left 3,000 NFT',
    bean: Buff_3_Bean_Image,
    pill_name: 'Superman Pill',
    pill_amount_eth: 0.99,
    color: '${({ theme }) => theme.bg6}',
    bg_color: 'rgba(44, 255, 243, 0.2)',
    boosts: [
      { name: 'Trading rewards', amount: 'x 0.3' },
      { name: 'Referral rewards', amount: 'x 0.3' },
      { name: 'Sacrifice Reimbursement ', amount: 'x 1.0' },
    ],
  },
]
export default function Buff() {
  return (
    <BuffWrapper>
      <BuffTitle
        style={{
          textAlign: 'center',
        }}
      >
        <img src={BuffTitleImage} width={496}></img>
      </BuffTitle>

      <BuffItems>
        {items_data.map((item) => {
          return <BuffItem {...item} key={item.pill_name} />
        })}
      </BuffItems>
    </BuffWrapper>
  )
}
