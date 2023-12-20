import { useAppDispatch } from "@/app/hooks"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import changePasswordSchema, {
  ChangePasswordFormValues,
} from "@/libs/yup/schemas/changePassword"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { changeUserPassword } from "../../userThunk"
import { useTranslation } from "react-i18next"
import Button from "@/components/Button/Button"

const ChangePasswordForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms"])
  const changePasswordInitialValues: ChangePasswordFormValues = {
    newPassword: "",
    confirmNewPassword: "",
  }
  return (
    <Formik
      onSubmit={async (values, { resetForm }) => {
        await dispatch(changeUserPassword(values))
        resetForm()
      }}
      initialValues={changePasswordInitialValues}
      validationSchema={changePasswordSchema}
      enableReinitialize
    >
      {({ isSubmitting, dirty, resetForm }) => (
        <Form>
          <Grid container spacing={2} paddingY={2}>
            <Grid item xs={12}>
              <FormikTextField
                type="password"
                name="newPassword"
                label={t("forms:labels.newPassword")}
                helperText={t("forms:helperTexts.password")}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                type="password"
                name="confirmNewPassword"
                label={t("forms:labels.confirmNewPassword")}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                disabled={!dirty || isSubmitting}
                isSubmitting={isSubmitting}
                fullWidth
                size="large"
              >
                {t("common:submit")}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                color="error"
                variant="outlined"
                disabled={!dirty || isSubmitting}
                onClick={resetForm}
                fullWidth
                size="large"
              >
                {t("common:reset")}
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default ChangePasswordForm
