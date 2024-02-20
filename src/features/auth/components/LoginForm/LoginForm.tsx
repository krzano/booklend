import { useAppDispatch } from "@/app/hooks"
import Button from "@/components/Button/Button"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { useTranslation } from "react-i18next"
import { loginUser } from "../../authThunk"
import loginSchema, { LoginFormValues } from "@/libs/yup/schemas/login"
import Divider from "@mui/material/Divider/Divider"
import Typography from "@mui/material/Typography/Typography"
import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import { useState } from "react"
import { Stack } from "@mui/material"

const DEMO_ACCOUNT_EMAIL = import.meta.env.VITE_DEMO_ACCOUNT_EMAIL
const DEMO_ACCOUNT_PASSWORD = import.meta.env.VITE_DEMO_ACCOUNT_PASSWORD

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms"])
  const [isDemoAccountLoading, setIsDemoAccountLoading] = useState(false)
  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  }
  return (
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
              <Stack spacing={2}>
                <Button
                  color="secondary"
                  type="submit"
                  isSubmitting={isSubmitting}
                  disabled={isDemoAccountLoading}
                  fullWidth
                  size="large"
                >
                  {t("common:login")}
                </Button>
                <Divider>
                  <Typography
                    color={(theme) => theme.palette.grey[500]}
                    fontSize={14}
                    fontWeight={500}
                  >
                    {t("common:orContinueWith")}
                  </Typography>
                </Divider>
                <Button
                  type="button"
                  onAsyncClick={async () => {
                    setIsDemoAccountLoading(true)
                    await dispatch(
                      loginUser({
                        email: DEMO_ACCOUNT_EMAIL,
                        password: DEMO_ACCOUNT_PASSWORD,
                      }),
                    )
                    setIsDemoAccountLoading(false)
                  }}
                  disabled={isSubmitting}
                  color="secondary"
                  variant="outlined"
                  size="large"
                  fullWidth
                  startIcon={<AccountCircleIcon />}
                >
                  {t("common:demoAccount")}
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default LoginForm
