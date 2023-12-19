import { Box, Link, Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setIsRegistrationCompleted } from "../authSlice"
import { useTranslation } from "react-i18next"
import { LOGIN_PATH } from "@/constants/paths"
import SignupForm from "../components/SignupForm/SignupForm"

const Signup = () => {
  const { t } = useTranslation(["forms"])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isRegistrationCompleted } = useAppSelector((store) => store.auth)

  if (isRegistrationCompleted) {
    navigate(LOGIN_PATH)
    dispatch(setIsRegistrationCompleted(false))
  }

  return (
    <StyledSignup>
      <Box p={2}>
        <Box
          textAlign="center"
          display="flex"
          flexDirection="column"
          gap={1}
          my={1}
        >
          <Typography variant="h4">{t("common:signup")}</Typography>
          <Typography>{t("forms:quickEasy")}</Typography>
        </Box>
        <SignupForm />
        <Box>
          <Typography my={2} textAlign="center">
            {t("forms:alreadyRegistered")}{" "}
            <Link
              color="secondary"
              underline="always"
              component={RouterLink}
              to={LOGIN_PATH}
            >
              {t("forms:loginHere")}
            </Link>
            .
          </Typography>
        </Box>
      </Box>
    </StyledSignup>
  )
}

export const StyledSignup = styled.div`
  width: 400px;
  ${({ theme }) => css`
    background-color: ${theme.palette.background.default};
    border-radius: ${theme.shape.borderRadius}px;
    border: 1px solid ${theme.palette.grey[300]};
  `}
`

export default Signup
