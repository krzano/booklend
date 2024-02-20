import Button from "@/components/Button/Button"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import registerSchema, { RegisterFormValues } from "@/libs/yup/schemas/register"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { useTranslation } from "react-i18next"
import { registerUser } from "../../authThunk"
import { useAppDispatch } from "@/app/hooks"

const SignupForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms"])
  const initialValues: RegisterFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async ({ firstName, lastName, email, password }) => {
        await dispatch(registerUser({ firstName, lastName, email, password }))
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
            <Grid item xs={12} mt={{ xs: 1, sm: 0 }}>
              <Button
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
  )
}
export default SignupForm
