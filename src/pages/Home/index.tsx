import React from 'react'
import { Redirect, RouteComponentProps } from 'react-router-dom'
import HomeBgImage from '../../assets/images/home_bg.png'
import styled from 'styled-components'

export function RedirectPathToHome({ location }: RouteComponentProps) {
  return <Redirect to={{ ...location, pathname: '/' }} />
}

const HomeSlognWrapper = styled.div<{ bg: any }>`
  background-image: url(${(props) => props.bg});
  background-size: 100% 100%;
  background-repeat: no-repeat;
  aspect-ratio: 2/1;
`

export default function Home() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <HomeSlognWrapper bg={HomeBgImage}></HomeSlognWrapper>
    </div>
  )
}
