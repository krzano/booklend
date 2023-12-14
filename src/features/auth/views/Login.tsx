import { Box, Grid, Link, Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { Form, Formik } from "formik"
import Button from "@/components/Button/Button"
import loginSchema, { LoginFormValues } from "@/libs/yup/schemas/loginSchema"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import { Link as RouterLink } from "react-router-dom"
import { loginUser } from "../authSlice"
import { useAppDispatch } from "@/app/hooks"
import { useTranslation } from "react-i18next"

const Login = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms", "common"])

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
          {({ isSubmitting }) => (
            <Form>
              <Grid container columns={1} spacing={3} paddingY={2}>
                <Grid item xs={1}>
                  <FormikTextField
                    type="email"
                    name="email"
                    label={t("forms:labels.email")}
                    disabled={isSubmitting}
                    required
                  />
                </Grid>
                <Grid item xs={1}>
                  <FormikTextField
                    type="password"
                    name="password"
                    label={t("forms:labels.password")}
                    disabled={isSubmitting}
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    isSubmitting={isSubmitting}
                    fullWidth
                    size="large"
                  >
                    {t("common:login")}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Box>
          <Typography my={2} textAlign="center">
            {t("forms:newToApp")}{" "}
            <Link
              color="secondary"
              underline="always"
              component={RouterLink}
              to="/signup"
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
