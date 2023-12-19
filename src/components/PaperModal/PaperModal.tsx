import { Paper, Typography } from "@mui/material"
import Modal, { ModalProps } from "@mui/material/Modal/Modal"
import { ReactNode } from "react"
import styled, { css } from "styled-components"

interface PaperModalProps extends Omit<ModalProps, "children"> {
  children: ReactNode
  title?: string
}

const PaperModal = ({
  children,
  open,
  onClose,
  title,
  ...restModalProps
}: PaperModalProps) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby={restModalProps["aria-labelledby"]}
      aria-describedby={restModalProps["aria-describedby"]}
    >
      <Paper elevation={0}>
        {title && (
          <StyledTitle
            component="h2"
            fontSize={{ xs: 36, sm: 44 }}
            marginBottom={3}
            fontWeight="300"
          >
            {title}
          </StyledTitle>
        )}
        <>{children}</>
      </Paper>
    </StyledModal>
  )
}

const StyledModal = styled(Modal)`
  .MuiBackdrop-root {
    background-color: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(0.5rem);
  }
  .MuiPaper-root {
    position: absolute;
    top: 50%;
    left: 50%;
    translate: -50% -50%;
    width: 80vw;
    max-width: 50rem;
    text-align: center;
    ${({ theme }) => css`
      padding: ${theme.spacing(4)} ${theme.spacing(3)};
      background-color: ${theme.palette.background.default};
      border: 1px solid ${theme.palette.primary.main};
    `}
  }
`

const StyledTitle = styled(Typography)`
  &::first-letter {
    text-transform: uppercase;
  }
`

export default PaperModal
