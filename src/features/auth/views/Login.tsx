import { Box, Link, Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { Formik } from "formik"
import loginSchema, { LoginFormValues } from "@/libs/yup/schemas/login"
import { Link as RouterLink } from "react-router-dom"
import { loginUser } from "../authThunk"
import { useAppDispatch } from "@/app/hooks"
import { useTranslation } from "react-i18next"
import { SIGNUP_PATH } from "@/constants/paths"
import LoginForm from "../components/LoginForm/LoginForm"

const Login = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms"])

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  }
  return (
    <StyledLogin>
      <Box p={2}>
        <Typography variant="h4" my={2} textAlign="center">
          {t("common:login")}
        </Typography>
        <Formik
          initialValues={initialValues}
          onSubmit={async ({ email, password }) => {
            await dispatch(loginUser({ email, password }))
          }}
          validationSchema={loginSchema}
        >
          {({ isSubmitting }) => <LoginForm isSubmitting={isSubmitting} />}
        </Formik>
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
