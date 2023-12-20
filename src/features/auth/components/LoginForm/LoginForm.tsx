import { useAppDispatch } from "@/app/hooks"
import Button from "@/components/Button/Button"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { useTranslation } from "react-i18next"
import { loginUser } from "../../authThunk"
import loginSchema, { LoginFormValues } from "@/libs/yup/schemas/login"

const LoginForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms"])
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
              <Button
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
  )
}
export default LoginForm
