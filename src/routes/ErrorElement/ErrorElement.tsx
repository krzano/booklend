import error404Img from "@/assets/images/error-404.svg"
import errorImg from "@/assets/images/fetching-error.svg"
import { Box, Button, Container, Paper, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { Link, isRouteErrorResponse, useRouteError } from "react-router-dom"
import styled from "styled-components"

const ErrorElement = () => {
  const { t } = useTranslation()
  const error = useRouteError()
  let errorMessage = t("common:somethingWrong")
  let errorImage = errorImg
  if (isRouteErrorResponse(error) && error.status === 404) {
    errorMessage = t("common:pageNotFound")
    errorImage = error404Img
  }
  console.error(error)
  return (
    <StyledContainer
      sx={{ display: "grid", placeContent: "center", minHeight: "100vh" }}
    >
      <StyledPaper>
        <Box component="img" src={errorImage} width={400} />
        <Typography component="h2" fontSize={26}>
          {errorMessage}
        </Typography>
        <Button
          variant="contained"
          size="medium"
          color="secondary"
          component={Link}
          to="/"
        >
          {t("common:returnToHomePage")}
        </Button>
      </StyledPaper>
    </StyledContainer>
  )
}

const StyledContainer = styled(Container)`
  display: grid;
  place-content: center;
  min-height: 100vh;
`

const StyledPaper = styled(Paper)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  padding: 4rem 6rem;
  text-align: center;
`

export default ErrorElement
