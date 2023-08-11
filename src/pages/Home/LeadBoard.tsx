import styled from 'styled-components'
import Column from 'components/Column'
import LeadBoardTitleImage from '../../assets/images/home/leadboard_title.png'
import { Table } from 'components/Table'
import { StairCard } from 'components/StairCard'
import StairBgImage from '../../assets/svg/stair_bg.svg'

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
        bg={StairBgImage}
        style={{
          marginTop: '50px',
          background: 'transparent',
        }}
      >
        <Table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Address</th>
              <th>trading Boost</th>
              <th>Volume</th>
              <th>trading IQ </th>
              <th>Estimated rewards</th>
              <th>Red bull</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2123</td>
              <td>1223</td>
              <td>asdasd</td>
              <td>asdasd</td>
              <td>asdasd</td>
              <td>asdasd</td>
              <td
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
              </td>
            </tr>
          </tbody>
        </Table>
      </StairCard>
    </LeadBoardWrapper>
  )
}
