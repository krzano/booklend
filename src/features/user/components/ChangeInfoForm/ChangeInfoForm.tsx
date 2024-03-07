import { useAppDispatch, useAppSelector } from "@/app/hooks"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import changeUserInfoSchema, {
  ChangeUserInfoFormValues,
} from "@/libs/yup/schemas/changeUserInfo"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { changeUserData } from "../../userThunk"
import { useTranslation } from "react-i18next"
import Button from "@/components/Button/Button"

const ChangeInfoForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms", "settings"])
  const isDemoAccount = useAppSelector((state) => state.user.isDemoAccount)
  const firstName = useAppSelector((store) => store.user.userData.firstName)
  const lastName = useAppSelector((store) => store.user.userData.lastName)
  const email = useAppSelector((store) => store.user.userData.email)

  const initialValues: ChangeUserInfoFormValues = {
    firstName,
    lastName,
    email,
  }
  return (
    <Formik
      onSubmit={async (values) => {
        await dispatch(changeUserData(values))
      }}
      initialValues={initialValues}
      validationSchema={changeUserInfoSchema}
      enableReinitialize
    >
      {({ isSubmitting, dirty, resetForm }) => {
        return (
          <Form>
            <Grid container spacing={2} paddingY={2}>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  name="firstName"
                  label={t("forms:labels.firstName")}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormikTextField
                  name="lastName"
                  label={t("forms:labels.lastName")}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  type="email"
                  name="email"
                  label={t("forms:labels.email")}
                  helperText={
                    isDemoAccount ? t("settings:demoCantChangeEmail") : ""
                  }
                  disabled={isDemoAccount || isSubmitting}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
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
              <Grid item xs={6} sm={6}>
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
        )
      }}
    </Formik>
  )
}
export default ChangeInfoForm
