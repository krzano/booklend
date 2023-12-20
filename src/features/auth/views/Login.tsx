import { Box, Link, Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { Link as RouterLink } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { SIGNUP_PATH } from "@/constants/paths"
import LoginForm from "../components/LoginForm/LoginForm"

const Login = () => {
  const { t } = useTranslation(["forms"])

  return (
    <StyledLogin>
      <Box p={2}>
        <Typography variant="h4" my={2} textAlign="center">
          {t("common:login")}
        </Typography>
        <LoginForm />
        <Box>
          <Typography my={2} textAlign="center">
            {t("forms:newToApp")}{" "}
            <Link
              color="secondary"
              underline="always"
              component={RouterLink}
              to={SIGNUP_PATH}
            >
              {t("forms:signupNow")}
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </StyledLogin>
  )
}

export const StyledLogin = styled.div`
  width: 400px;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.default};
    border-radius: ${theme.shape.borderRadius}px;
    border: 1px solid ${theme.palette.grey[300]};
  `}
`

export default Login
