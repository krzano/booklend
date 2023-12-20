import { keyframes } from "styled-components"

export const pulseAnimation = keyframes`
0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.15);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
`
