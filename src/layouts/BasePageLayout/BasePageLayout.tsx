import { Box, Container } from "@mui/material"
import { Outlet } from "react-router-dom"
import logo from "@/assets/images/logo.svg"
import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import styled from "styled-components"

const BasePageLayout = () => {
  return (
    <StyledBasePageLayout>
      <Box component={"header"} marginBottom={{ xs: 1, sm: 5 }}>
        <Box position={"absolute"} right={0} p={2}>
          <LanguageSwitcher variant="outlined" />
        </Box>
        <Box py={{ xs: 10, sm: 6 }}>
          <Box
            component={"img"}
            src={logo}
            alt="Booklend logo"
            margin={"0 auto"}
            maxWidth={8 / 10}
            height={50}
          />
        </Box>
      </Box>
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
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
