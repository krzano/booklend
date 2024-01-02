import { Typography, TypographyProps } from "@mui/material"
import styled from "styled-components"

interface PageTitleProps
  extends Omit<TypographyProps, "children" | "variant" | "component"> {
  children: string | (string | number)[]
}

const PageTitle = ({
  children,
  marginBottom = { xs: 6, sm: 8 },
  ...restTypographyProps
}: PageTitleProps) => {
  return (
    <StyledPageTitle
      variant="h2"
      marginBottom={marginBottom}
      {...restTypographyProps}
    >
      {children}
    </StyledPageTitle>
  )
}

const StyledPageTitle = styled(Typography)`
  &::first-letter {
    text-transform: uppercase;
  }
`
export default PageTitle
