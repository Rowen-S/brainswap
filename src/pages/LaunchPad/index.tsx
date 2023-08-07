import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../components/Column'
import Row from 'components/Row'
import SupplyBgImage from '../../assets/images/ilo/supply_bg.svg'
import OfferBgImage from '../../assets/images/ilo/offer_bg.svg'
import LPHistoryBgImage from '../../assets/images/ilo/lp_history_bg.svg'
import { StairCard } from 'components/StairCard'
import SupplyItem from './SupplyItem'
import AddLP from './AddLP'
import ConvertLP from './ConvertLP'
import LPHistory from './LPHistory'
import { useWeb3React } from '@web3-react/core'
import { useTotalSupply } from 'hooks/useTotalSupply'
import { IQ } from 'constants/tokens'
import { formatEther } from '@ethersproject/units'
import { useIDOContract } from 'hooks/useContract'
import { useSingleCallResult } from 'state/multicall/hooks'
// import { useCallback } from 'react'
import { IDO_RATIO } from 'constants/misc'
import { Text } from 'rebass'

const PageWrapper = styled(AutoColumn)`
  width: 100%;
`
const ContentWrapper = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;
`

const SectionWrapper = styled.section`
  margin-top: 50px;
`

const ILOTitle = styled(Row)`
  color: ${({ theme }) => theme.text1};
  font-size: 28px;
`

const OfferWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 40px;
`

export default function LaunchPad() {
  const { chainId } = useWeb3React()
  const idoContract = useIDOContract()
  const iq = chainId ? IQ[chainId] : undefined

  const totalSupply: CurrencyAmount<Token> | undefined = useTotalSupply(iq)

  const idoSupply = useSingleCallResult(idoContract, 'totalInvestedETH', [])?.result?.[0]

  // const tokenContract = useTokenContract(iq)
  // console.log(tokenContract)

  // console.log(tokenContract?.totalSupply())

  // const totalSupply = useSingleCallResult(tokenContract, 'totalSupply', [])
  // console.log(totalSupply)

  return (
    <PageWrapper>
      <ContentWrapper>
        <SectionWrapper>
          <ILOTitle>IQ200 Initial Launchpad Offerings</ILOTitle>
          <StairCard bg={SupplyBgImage}>
            <Row height="100%" align={'start'} justify="space-around">
              <SupplyItem
                title="Total Supply"
                content={{
                  value: totalSupply?.toSignificant(4),
                  suffix: 'IQ200',
                }}
                desc="Fair launch for ALL MEME DEGEN"
              />
              <SupplyItem
                title="IDO Supply"
                content={{
                  value: totalSupply?.multiply(IDO_RATIO)?.toSignificant(4),
                  suffix: '[10%]',
                }}
                desc="Equivalent to 10 ETH"
              />
              <SupplyItem
                title="Softcap"
                content={{
                  value: '100',
                  suffix: 'ETH',
                }}
              />
              <SupplyItem
                title="Total Raised"
                content={{
                  value: idoSupply ? formatEther(idoSupply) : '-',
                  suffix: 'ETH',
                }}
                desc="Equivalent to 10 ETH"
              />
              <SupplyItem
                title="FDV"
                content={{
                  value: '',
                  suffix: 'ETH/IQ200',
                }}
              />
            </Row>
          </StairCard>

          <Text fontSize={14} maxWidth={['90%', '65%']} margin="0px auto" lineHeight={'24px'} textAlign={'center'}>
            *There is no Hard Cap where the IQ price will continuously increase at every purchase. No matter when you
            participate, everyone will get IQ tokens at the same final price. If Total Raised doesn’t meet the Soft Cap,
            all the ETH raised will be refunded. The 10% IQ token will be airdropped to the participated address
            according to the ETH share.
          </Text>

          <OfferWrapper>
            <StairCard bg={OfferBgImage}>
              <AddLP />
            </StairCard>
            <StairCard bg={OfferBgImage}>
              <ConvertLP />
            </StairCard>
          </OfferWrapper>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Offering LP History</ILOTitle>

          <StairCard bg={LPHistoryBgImage}>
            <LPHistory />
          </StairCard>
        </SectionWrapper>

        <SectionWrapper>
          <ILOTitle>Disclaimer</ILOTitle>

          <StairCard
            bg={LPHistoryBgImage}
            style={{
              opacity: 0.8,
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '30px',
            }}
          >
            {`Please ensure you understand the public sale mechanics and terms before proceeding, deposited amounts CANNOT
          be withdrawn.Initially, the auction will start with a fully diluted valuation (FDV) of $830k, fixing a $0.0083
          floor price for $RDO, and will increase after the first $100k have been raised. Once those $100k are reached,
          we'll enter a price-discovery phase, where the token price will continuously increase at every purchase. 
          `}
            <br />
            {`No matter when you participate, everyone will get $RDO tokens at the same final price. Your allocation will be
          made up of $srRDO, a receipt token made up of 30% $RDO and 70% $xRDO. Please check the Rodeo dapp page for
          $RDO claims and information.`}
          </StairCard>
        </SectionWrapper>
      </ContentWrapper>
    </PageWrapper>
  )
}
