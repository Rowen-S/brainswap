import React from 'react'
import styled from 'styled-components/macro'
import { AutoColumn } from '../../components/Column'
import Row from 'components/Row'
import SupplyBgImage from '../../assets/images/ilo/supply_bg.svg'
import OfferBgImage from '../../assets/images/ilo/offer_bg.svg'
import LPHistoryBgImage from '../../assets/images/ilo/lp_history_bg.svg'
import DecorateBottomBgImage from '../../assets/images/decorate_bottom_bg.png'
import DecorateBottomEarthImage from '../../assets/images/decorate_bottom_earth.png'
import { StairCard } from 'components/StairCard'
import SupplyItem from './SupplyItem'
import AddLP from './AddLP'
import ConvertLP from './ConvertLP'
import LPHistory from './LPHistory'
import { useIDOContract } from 'hooks/useContract'

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
  color: #ffffff;
  font-size: 28px;
`

const OfferWrapper = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  grid-row-gap: 40px;
`

const DecorateBottomBg = styled(Row)<{ bg: any }>`
  margin-top: 76px;
  background-image: url(${(props) => props.bg});
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 300px;
`

const DecorateBottomEarth = styled.img`
  position: absolute;
  margin-top: 76px;
  width: 447px;
`

export default function LaunchPad() {
  const idoContract = useIDOContract()
  console.log(idoContract)

  return (
    <PageWrapper>
      <ContentWrapper>
        <SectionWrapper>
          <ILOTitle>IQ200 Initial Launchpad Offerings</ILOTitle>

          <StairCard bg={SupplyBgImage}>
            <Row align="center" height="100%" justify="space-around">
              <SupplyItem title="Total Supply" value="10,000,000,000 IQ200" desc="Fair launch for ALL MEME DEGEN" />
              <SupplyItem title="IDO Supply" value="40,000,000「4%」" desc="Equivalent to 10 ETH" />
              <SupplyItem title="Your allocation" value="100,100 IQ200" desc="Equivalent to 10 ETH" />
              <SupplyItem title="Fixed Price" value="0.0001 ETH/IQ200" desc="" />
            </Row>
          </StairCard>

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

      <DecorateBottomBg bg={DecorateBottomBgImage} justify="center" align="flex-end">
        <DecorateBottomEarth src={DecorateBottomEarthImage}></DecorateBottomEarth>
      </DecorateBottomBg>
    </PageWrapper>
  )
}
