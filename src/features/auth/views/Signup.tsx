import { Box, Grid, Link, Typography } from "@mui/material"
import styled, { css } from "styled-components"
import { Form, Formik } from "formik"
import Button from "@/components/Button/Button"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import registerSchema, {
  RegisterFormValues,
} from "@/libs/yup/schemas/registerSchema"
import { Link as RouterLink, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { registerUser, setIsRegistrationCompleted } from "../authSlice"
import { useTranslation } from "react-i18next"

const Signup = () => {
  const { t } = useTranslation(["forms", "common"])
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { isRegistrationCompleted } = useAppSelector((store) => store.auth)
  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }

  if (isRegistrationCompleted) {
    navigate("/login")
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
        <Formik
          initialValues={initialValues}
          onSubmit={async ({ firstName, lastName, email, password }) => {
            await dispatch(
              registerUser({ firstName, lastName, email, password }),
            )
          }}
          validationSchema={registerSchema}
        >
          {({ isSubmitting }) => (
            <Form>
              <Grid
                container
                rowSpacing={{ xs: 2, sm: 3 }}
                columnSpacing={2}
                paddingY={2}
              >
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    type="text"
                    name="firstName"
                    label={t("forms:labels.firstName")}
                    disabled={isSubmitting}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormikTextField
                    type="text"
                    name="lastName"
                    label={t("forms:labels.lastName")}
                    disabled={isSubmitting}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    type="email"
                    name="email"
                    label={t("forms:labels.email")}
                    disabled={isSubmitting}
                    required
                    helperText={`${t("common:example")}: email@example.com`}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    type="password"
                    name="password"
                    label={t("forms:labels.password")}
                    disabled={isSubmitting}
                    required
                    helperText={t("forms:helperTexts.password")}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    type="password"
                    name="confirmPassword"
                    label={t("forms:labels.confirmPassword")}
                    disabled={isSubmitting}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    isSubmitting={isSubmitting}
                    fullWidth
                    size="large"
                  >
                    {t("common:signup")}
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
        <Box>
          <Typography my={2} textAlign="center">
            {t("forms:alreadyRegistered")}{" "}
            <Link
              color="secondary"
              underline="always"
              component={RouterLink}
              to="/login"
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
