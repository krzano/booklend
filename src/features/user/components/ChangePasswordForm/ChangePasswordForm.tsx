import { useAppDispatch } from "@/app/hooks"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import changePasswordSchema, {
  ChangePasswordFormValues,
} from "@/libs/yup/schemas/changePassword"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { changeUserPassword } from "../../userThunk"
import SubmitFormButton from "../../../../components/SubmitFormButton/SubmitFormButton"
import ResetFormButton from "../../../../components/ResetFormButton/ResetFormButton"
import { useTranslation } from "react-i18next"

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
    >
      {({ isSubmitting, dirty, resetForm }) => (
        <Form>
          <Grid container spacing={2} paddingY={2}>
            <Grid item xs={12} md={12}>
              <FormikTextField
                type="password"
                name="newPassword"
                label={t("forms:labels.newPassword")}
                helperText={t("forms:helperTexts.password")}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <FormikTextField
                type="password"
                name="confirmNewPassword"
                label={t("forms:labels.confirmNewPassword")}
                disabled={isSubmitting}
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <SubmitFormButton dirty={dirty} isSubmitting={isSubmitting}>
                {t("common:submit")}
              </SubmitFormButton>
            </Grid>
            <Grid item xs={6} sm={6}>
              <ResetFormButton
                dirty={dirty}
                isSubmitting={isSubmitting}
                resetForm={resetForm}
              >
                {t("common:reset")}
              </ResetFormButton>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default ChangePasswordForm
