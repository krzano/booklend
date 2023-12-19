import { useAppDispatch, useAppSelector } from "@/app/hooks"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import changeUserInfoSchema, {
  ChangeUserInfoFormValues,
} from "@/libs/yup/schemas/changeUserInfo"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik } from "formik"
import { changeUserData } from "../../userThunk"
import SubmitFormButton from "../../../../components/SubmitFormButton/SubmitFormButton"
import ResetFormButton from "../../../../components/ResetFormButton/ResetFormButton"
import { useTranslation } from "react-i18next"

const ChangeInfoForm = () => {
  const dispatch = useAppDispatch()
  const { t } = useTranslation(["forms"])
  const {
    userData: { firstName, lastName, email },
  } = useAppSelector((store) => store.user)
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
    >
      {({ isSubmitting, values, setValues }) => {
        // in this case I had to create my own 'dirty' and 'resetForm' because after user submitted new values, formik's: 'dirty' and 'resetForm' were still using the old values
        const dirty =
          values.firstName !== firstName ||
          values.lastName !== lastName ||
          values.email !== email
        const resetForm = () => {
          setValues({ firstName, lastName, email })
        }
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
        )
      }}
    </Formik>
  )
}
export default ChangeInfoForm
