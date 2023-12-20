import { Box, BoxProps, Typography } from "@mui/material"
import { ReactElement } from "react"
import styled from "styled-components"

interface SectionProps extends Omit<BoxProps, "component"> {
  title?: string
  children: ReactElement
}

const Section = ({ title, children, ...restBoxProps }: SectionProps) => {
  return (
    <Box component="section" {...restBoxProps}>
      {title && (
        <StyledSectionTitle variant="h3" marginBottom={1}>
          {title}
        </StyledSectionTitle>
      )}
      <Box>{children}</Box>
    </Box>
  )
}

const StyledSectionTitle = styled(Typography)`
  &::first-letter {
    text-transform: uppercase;
  }
`

export default Section
