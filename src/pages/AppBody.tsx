import React from 'react'
import styled from 'styled-components/macro'

import CardBord from 'assets/svg/card-border.svg'

export const BodyWrapper = styled.div<{ margin?: string }>`
  position: relative;
  margin-top: ${({ margin }) => margin ?? '0px'};
  max-width: 480px;
  width: 100%;
  border: 3px solid ${({ theme }) => theme.bg0};
  margin-top: 1rem;
  ::before,
  ::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    background: url(${CardBord});
    background-size: cover;
  }
  ::before {
    top: -3px;
    left: -3px;
  }

  ::after {
    bottom: -3px;
    right: -3px;
  }
  .body-other {
    ::before,
    ::after {
      content: '';
      position: absolute;
      width: 18px;
      height: 18px;
      background: url(${CardBord});
      background-size: cover;
      transform: rotate(90deg);
    }
    ::before {
      top: -3px;
      right: -3px;
    }

    ::after {
      bottom: -3px;
      left: -3px;
    }
  }
`
/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children, ...rest }: { children: React.ReactNode }) {
  return (
    <BodyWrapper {...rest}>
      <div className="body-other"></div>
      {children}
    </BodyWrapper>
  )
}
