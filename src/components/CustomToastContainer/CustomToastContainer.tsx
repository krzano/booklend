import { Flip, ToastContainer } from "react-toastify"
import styled, { css } from "styled-components"
import "react-toastify/dist/ReactToastify.css"

const CustomToastContainer = () => {
  return (
    <StyledToastContainer
      icon={false}
      closeButton={false}
      position="top-center"
      autoClose={2000}
      transition={Flip}
    />
  )
}

const StyledToastContainer = styled(ToastContainer)`
  .Toastify__toast {
    top: 3rem;
    left: 50%;
    translate: -50%;
    padding: 0.5em 3em;
    margin-bottom: 1rem;
    max-width: 80vw;
    font-size: 1.6rem;
    font-family: "Source Sans 3", sans-serif;
    text-align: center;
    ${({ theme }) => css`
      border-radius: ${theme.shape.borderRadius}px;
      background-color: ${theme.palette.background.paper};
      border: 1px solid ${theme.palette.primary.light};
      color: ${theme.palette.primary.main};
    `}
  }
  .Toastify__toast-body {
    div::first-letter {
      text-transform: capitalize;
    }
  }
  .Toastify__progress-bar {
    height: 3px;
  }
`

export default CustomToastContainer
