import Backdrop from "@mui/material/Backdrop/Backdrop"
import Loader from "../Loader/Loader"
import { backgroundBreathingAnimation } from "@/styles/animations"
import styled, { css } from "styled-components"

interface CustomBackdropProps {
  open: boolean
  rounded?: boolean
}

const CustomBackdrop = ({ open, rounded }: CustomBackdropProps) => {
  return (
    <StyledBackdrop open={open} $rounded={rounded}>
      <Loader />
    </StyledBackdrop>
  )
}

const StyledBackdrop = styled(Backdrop)<{
  $rounded: CustomBackdropProps["rounded"]
}>`
  ${({ theme, $rounded }) => css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: ${theme.zIndex.drawer - 1};
    animation: 1s infinite alternate ${backgroundBreathingAnimation};
    pointer-events: all;
    ${$rounded &&
    css`
      border-radius: ${theme.shape.borderRadius}px;
    `}
  `}
`
export default CustomBackdrop
