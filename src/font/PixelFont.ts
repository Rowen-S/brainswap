// @ts-ignore
import { createGlobalStyle } from 'styled-components'
// @ts-ignore
import PixelFont7 from '../assets/font/pixel-font-7.ttf'

const PixelFont = createGlobalStyle`

@font-face {
  font-family: 'PixelFont7';
  src: url(${PixelFont7}) format(truetype);
}
`

export default PixelFont
