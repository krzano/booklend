import Button from "@/components/Button/Button"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import Grid from "@mui/material/Grid/Grid"
import { Form, FormikFormProps } from "formik"
import { useTranslation } from "react-i18next"

interface LoginFormProps extends FormikFormProps {
  isSubmitting: boolean
}

const LoginForm = ({
  isSubmitting,
  ...restFormikFormProps
}: LoginFormProps) => {
  const { t } = useTranslation(["forms"])
  return (
    <Form {...restFormikFormProps}>
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
  )
}
export default LoginForm
