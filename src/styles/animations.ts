import { keyframes } from "styled-components"

export const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0px rgba(0, 0, 0, 0.15);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(0, 0, 0, 0);
  }
`

export const backgroundBreathingAnimation = keyframes`
  0% {
    background-color:rgba(158, 158, 158, 0.7);
  }
  100% {
    background-color:rgba(158, 158, 158, 0.3);
  }
`
