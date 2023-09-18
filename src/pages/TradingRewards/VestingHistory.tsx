import { StairCard } from 'components/StairCard'
import { useCallback, useMemo } from 'react'
import StairBgImage from '../../assets/svg/stair_bg.svg'
import { Text } from 'rebass'
import { RowBetween } from 'components/Row'
import { Table } from 'components/Table'
import { ButtonNormal } from 'components/Button'
import { useEsTokenContract } from 'hooks/useContract'
import { idoClient } from 'lib/thegraph'
import { useQuery } from '@apollo/client'
import { GET_VESINGS } from 'lib/thegraph/gql/ido'
import { useWeb3React } from '@web3-react/core'
import { Duration, DateTime } from 'luxon'
import { formatLuxonDateTime, formatToFixed } from 'utils'
import { useSingleContractMultipleData, useSingleCallResult } from 'state/multicall/hooks'
import Loader from 'components/Loader'

export default function VestingHistory() {
  const { account } = useWeb3React()
  const esTokenContract = useEsTokenContract()

  const { loading, error, data } = useQuery<{
    redeems: Array<{ id: string; iqAmount: string; ESIQAmount: string; duration: string; timestamp: string }>
  }>(GET_VESINGS, {
    client: idoClient,
    variables: { user: account },
  })

  const userRedeemsLength = useSingleCallResult(esTokenContract, 'getUserRedeemsLength', [account ?? undefined])
    ?.result?.[0]

  const redeemIndexArg = useMemo(() => {
    const redeemIndexs = []
    for (let i = 0; i < (userRedeemsLength ?? 0); i++) {
      redeemIndexs.push([account ?? undefined, i])
    }
    return redeemIndexs
  }, [account, userRedeemsLength])

  const allUserRedeems = useSingleContractMultipleData(esTokenContract, 'getUserRedeem', redeemIndexArg)

  const anyLoading: boolean = useMemo(() => allUserRedeems.some(({ loading }) => loading), [allUserRedeems])
  const isValid = useMemo(() => allUserRedeems.some(({ valid }) => valid), [allUserRedeems])
  const isResult = useMemo(() => allUserRedeems.some(({ result }) => result), [allUserRedeems])

  const { totalIqAmount, isRedeem } = useMemo(() => {
    let totalIqAmount = 0
    let isRedeem = false
    if (isValid && isResult) {
      allUserRedeems.map(({ result }) => {
        totalIqAmount += parseFloat(result?.iqAmount.toString())
        const timestamp = DateTime.fromSeconds(result?.endTime.toNumber())
        isRedeem = timestamp <= DateTime.now()
        // console.log(result?.endTime, timestamp, timestamp <= DateTime.now())
      })
    }
    return { totalIqAmount, isRedeem }
  }, [isValid, isResult, allUserRedeems])

  const redeemAll = useCallback(() => {
    if (isValid && isResult) {
      allUserRedeems.map(({ result }, i) => {
        const timestamp = DateTime.fromSeconds(result?.endTime.toNumber())
        timestamp <= DateTime.now() && esTokenContract?.finalizeRedeem(i)
      })
    }
  }, [allUserRedeems, esTokenContract, isResult, isValid])

  return (
    <>
      <RowBetween>
        <Text fontSize={28} ml={15}>
          Vesting In Progress
        </Text>
        <Text fontSize={20} mr={15}>
          Redeemable: {anyLoading ? <Loader /> : !isRedeem ? 0 : formatToFixed(totalIqAmount / Math.pow(10, 18))} IQ
        </Text>
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
            {loading ? (
              <Loader />
            ) : data && data.redeems ? (
              data.redeems.map((x) => (
                <tr key={x.id}>
                  <td>{formatLuxonDateTime(x.timestamp)}</td>
                  <td>{Duration.fromObject({ seconds: parseInt(x.duration) }).as('days')} days</td>
                  <td>
                    {DateTime.fromSeconds(parseInt(x.timestamp) + parseInt(x.duration))
                      .diff(DateTime.now())
                      .as('days')
                      .toFixed(2)}{' '}
                    days
                  </td>
                  <td>{((parseFloat(x.iqAmount) / parseFloat(x.ESIQAmount)) * 100).toFixed(2)} %</td>
                  <td>{parseFloat(x.iqAmount).toLocaleString()}</td>
                </tr>
              ))
            ) : error ? (
              <>Error:</>
            ) : (
              <>NO Data</>
            )}
          </tbody>
        </Table>
        {!loading && data && data.redeems && data && data.redeems.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              fontSize: '18px',
              marginTop: '30px',
              color: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            No vesting history
          </div>
        ) : (
          <ButtonNormal m={'auto'} mt={10} maxWidth={558} disabled={!isRedeem} onClick={redeemAll}>
            Redeem all token
          </ButtonNormal>
        )}
      </StairCard>
    </>
  )
}
