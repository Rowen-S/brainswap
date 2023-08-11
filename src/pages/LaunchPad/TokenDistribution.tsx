import Row, { RowBetween } from 'components/Row'
import React from 'react'
import styled from 'styled-components'

const Distribution = styled(Row)`
  border: 4px solid #353642;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
`

const DistributionItem = styled.div<{ width: number; backgroundColor: string }>`
  width: ${(props) => props.width}%;
  height: 100%;
  background: ${(props) => props.backgroundColor};
`

const DistributionDesc = styled(RowBetween)`
  margin-top: 40px;
`

const DistributionCircle = styled.div<{ color: string }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => props.color};
`

const DistributionTitle = styled.div`
  font-size: 14px;
  margin-left: 10px;
  color: #ffffff;
  opacity: 0.5;
`

export default function TokenDistribution() {
  const distributionMap = [
    {
      share: 70,
      color: '#6B5DE0',
      title: '70% Trading Mining',
    },
    {
      share: 15,
      color: '#EC6B2C',
      title: '15% Team (6M cliff after TGE, vesting over 12M)',
    },
    {
      share: 10,
      color: '#64D8A0',
      title: '10% ILO (Initial LP Offering) ',
    },
    {
      share: 5,
      color: '#F2F557',
      title: '5% Ecosystem and Marketing ',
    },
  ]
  return (
    <>
      <Distribution>
        {distributionMap.map((item) => (
          <DistributionItem
            width={item.share}
            backgroundColor={item.color}
            key={item.title + 'progress'}
          ></DistributionItem>
        ))}
      </Distribution>

      <DistributionDesc>
        {distributionMap.map((item) => (
          <div
            key={item.title + 'desc'}
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <DistributionCircle color={item.color} />
            <DistributionTitle>{item.title}</DistributionTitle>
          </div>
        ))}
      </DistributionDesc>
    </>
  )
}
