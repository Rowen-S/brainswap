import React from 'react'

import styled from 'styled-components'
import Row, { RowBetween } from 'components/Row'

interface BuffItemProps {
  bg: string
  left: string
  bean: string
  pill_name: string
  pill_amount_eth: number
  color: string
  bg_color: string
  boosts: {
    name: string
    amount: string
  }[]
}

const BuffItemWrapper = styled.div<{ bg: any }>`
  background-image: url(${(props) => props.bg});
  background-size: 100%; 100%;
  background-repeat: no-repeat;
  aspect-ratio: 0.7;
  position: relative;
  width: 405px;
`

const LeftText = styled.div<{ borderColor: string; bg_color: string }>`
  width: 27;
  height: 28px;
  line-height: 26px;
  border-radius: 4px;
  position: absolute;
  top: 30px;
  right: 30px;
  padding: 0 10px;
  border: 1px solid ${(props) => props.borderColor};
  background: ${(props) => props.bg_color};
  font-size: 12px;
`

const PillImageWrapper = styled(Row)`
  margin-top: 100px;
`

const PillNameRow = styled(RowBetween)`
  margin-top: 60px;
  padding: 0 30px;
`

const BoostRow = styled(RowBetween)`
  margin-top: 20px;
  padding: 0 30px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 14px;
`

export default function BuffItem(props: BuffItemProps) {
  return (
    <BuffItemWrapper bg={props.bg}>
      <LeftText borderColor={props.color} bg_color={props.bg_color}>
        {props.left}
      </LeftText>
      <PillImageWrapper justify="center">
        <img
          src={props.bean}
          style={{
            width: '200px',
          }}
        ></img>
      </PillImageWrapper>

      <PillNameRow>
        <span
          style={{
            fontSize: '18px',
          }}
        >
          {props.pill_name}
        </span>
        <span
          style={{
            border: `1px solid ${props.color}`,
            height: '28px',
            lineHeight: '26px',
            padding: '0 12px',
            borderRadius: '4px',
            fontSize: '12px',
            color: `${props.color}`,
          }}
        >
          Claim for {props.pill_amount_eth} ETH
        </span>
      </PillNameRow>

      <BoostRow>
        <span>Item</span>
        <span>Boost</span>
      </BoostRow>

      {props.boosts.map((boost, index) => (
        <BoostRow key={index}>
          <span>{boost.name}</span>
          <span
            style={{
              border: `1px dashed ${props.color}`,
              height: '20px',
              lineHeight: '18px',
              padding: '0 12px',
              borderRadius: '4px',
            }}
          >
            {boost.amount}
          </span>
        </BoostRow>
      ))}
    </BuffItemWrapper>
  )
}
