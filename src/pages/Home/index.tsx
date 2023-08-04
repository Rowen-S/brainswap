import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import HomeBgImage from '../../assets/images/home/home_bg.png'
import HomeSolgan from '../../assets/images/home/slogan.png'
import LaunchButtonImage from '../../assets/images/home/launch_button.png'

import styled from 'styled-components'
import Buff from './Buff'
import LeadBoard from './LeadBoard'

export function RedirectPathToHome({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/' }} />
}

const HomeSlognWrapper = styled.div<{ bg: any }>`
  background-image: url(${(props) => props.bg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  aspect-ratio: 2/1;
  position: relative;
`

const HomeSlogn = styled.img`
  position: absolute;
  width: 26%;
  top: 35%;
  left: 23%;
`

const HomeLaunch = styled.img`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 13%;
  bottom: 20%;
  cursor: pointer;
`

export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#030514',
      }}
    >
      <HomeSlognWrapper bg={HomeBgImage}>
        <HomeSlogn src={HomeSolgan}></HomeSlogn>
        <HomeLaunch src={LaunchButtonImage}></HomeLaunch>
      </HomeSlognWrapper>
      <Buff></Buff>
      <LeadBoard />
    </div>
  )
}
