import styled from 'styled-components/macro'

export const StairCard = styled.div<{ bg: any }>`
  color: #ffffff;
  border: 30px solid transparent;
  border-image: url(${(props) => props.bg});
  border-image-slice: 50;
  border-image-repeat: stretch;
  font-size: 28px;
  padding: 20px;
`
