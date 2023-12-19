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
      <StyledTypography variant="h3" marginBottom={1}>
        {title}
      </StyledTypography>
      <Box>{children}</Box>
    </Box>
  )
}

const StyledTypography = styled(Typography)`
  &::first-letter {
    text-transform: uppercase;
  }
`

export default Section
