import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import styled from "styled-components"
import AppLogo from "@/components/AppLogo/AppLogo"

const BasePageLayout = () => {
  return (
    <StyledBasePageLayout>
      <Box component={"header"} marginBottom={{ xs: 1, sm: 5 }}>
        <Box position={"absolute"} right={0} p={2}>
          <LanguageSwitcher variant="outlined" />
        </Box>
        <Box pt={{ xs: 11, sm: 6 }} pb={{ xs: 6, sm: 6 }}>
          <AppLogo margin={"0 auto"} maxWidth={8 / 10} height={50} />
        </Box>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 3,
        }}
      >
        <Outlet />
      </Container>
    </StyledBasePageLayout>
  )
}

const StyledBasePageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.paper};
`

export default BasePageLayout
