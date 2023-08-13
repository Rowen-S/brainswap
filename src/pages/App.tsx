import { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styled from 'styled-components/macro'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
// import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Polling from '../components/Header/Polling'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import ErrorBoundary from '../components/ErrorBoundary'
// import { ApplicationModal } from '../state/application/actions'
// import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
// import Earn from './Earn'
// import Manage from './Earn/Manage'
import Pool from './Pool'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import Swap from './Swap'
// OpenClaimAddressModalAndRedirectToSwap,
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
// import Vote from './Vote'
// import VotePage from './Vote/VotePage'
import { RedirectDuplicateTokenIdsV2 } from './AddLiquidityV2/redirects'
import { ThemedBackground } from '../theme'
import ApeModeQueryParamReader from 'hooks/useApeModeQueryParamReader'
import LaunchPad from './LaunchPad'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-top: 120px;
  align-items: center;
  flex: 1;
  z-index: 1;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 6rem;
  `};
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 2;
`

const Marginer = styled.div`
  margin-top: 5rem;
`

// function TopLevelModals() {
//   const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
//   const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
//   return <AddressClaimModal isOpen={open} onDismiss={toggle} />
// }

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={null}>
        <Route component={GoogleAnalyticsReporter} />
        <Route component={DarkModeQueryParamReader} />
        <Route component={ApeModeQueryParamReader} />
        <AppWrapper>
          <HeaderWrapper>
            <Header />
          </HeaderWrapper>
          <BodyWrapper>
            <ThemedBackground />
            <Popups />
            <Polling />
            {/* <TopLevelModals /> */}
            <Web3ReactManager>
              <Switch>
                {/* <Route exact strict path="/vote" component={Vote} />
                <Route exact strict path="/vote/:id" component={VotePage} />
                <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} />
                <Route exact strict path="/uni" component={Earn} />
                <Route exact strict path="/uni/:currencyIdA/:currencyIdB" component={Manage} /> */}

                <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
                <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
                <Route exact strict path="/swap" component={Swap} />

                <Route exact strict path="/pool" component={Pool} />
                <Route exact strict path="/pool/find" component={PoolFinder} />

                <Route exact strict path="/add/:currencyIdA?/:currencyIdB?" component={RedirectDuplicateTokenIdsV2} />

                <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />

                <Route exact strict path="/launchpad" component={LaunchPad} />

                <Route component={RedirectPathToSwapOnly} />
              </Switch>
            </Web3ReactManager>
            <Marginer />
          </BodyWrapper>
        </AppWrapper>
      </Suspense>
    </ErrorBoundary>
  )
}
