import addReaderSchema, {
  AddReaderFormValues,
} from "@/libs/yup/schemas/addReader"
import Grid from "@mui/material/Grid/Grid"
import { Form, Formik, FormikHelpers } from "formik"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import { useTranslation } from "react-i18next"
import Button from "@/components/Button/Button"
import FormikFileInput from "@/components/FormikFileInput/FormikFileInput"
import ReaderImageUploadBox from "../ReaderImageUploadBox/ReaderImageUploadBox"
import Box from "@mui/material/Box/Box"
import { deleteReaderPhoto } from "../../readersThunk"
import { useParams } from "react-router-dom"
import { useAppDispatch } from "@/app/hooks"

interface AddReaderFormProps {
  initialValues: AddReaderFormValues
  onSubmit: (
    values: AddReaderFormValues,
    actions: FormikHelpers<AddReaderFormValues>,
  ) => void
  readerImgSrc?: string
}

const AddReaderForm = ({
  initialValues,
  onSubmit,
  readerImgSrc,
}: AddReaderFormProps) => {
  const { t } = useTranslation(["forms"])
  const { readerId } = useParams()
  const dispatch = useAppDispatch()
  const handlePostalCodeKeyUp = (e: any) => {
    let newValue = e.target.value.replaceAll(" ", "")
    if (e.target.value.length === 3 && e.target.value.endsWith("-")) {
      newValue = newValue.replace("-", "")
    }
    if (e.target.value.length === 3 && !e.target.value.endsWith("-")) {
      newValue = newValue.slice(0, 2) + "-" + newValue.slice(2)
    }
    if (e.target.value.length === 2) {
      newValue = newValue + "-"
    }
    e.target.value = newValue
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={addReaderSchema}
      enableReinitialize
    >
      {({ isSubmitting, dirty, resetForm, values }) => (
        <Form>
          <Box
            pb={2}
            display={"flex"}
            flexDirection={"column"}
            alignItems={{ xs: "center", md: "flex-start" }}
          >
            <FormikFileInput
              disabled={isSubmitting}
              accept="image/*"
              name="readerImage"
              sx={{ width: 240 }}
            >
              <ReaderImageUploadBox
                readerImage={values.readerImage}
                readerImgSrc={readerImgSrc}
              />
            </FormikFileInput>
            {readerImgSrc && !values.readerImage && (
              <Box width={240}>
                <Button
                  isSubmitting={isSubmitting}
                  variant="outlined"
                  color="error"
                  size="small"
                  fullWidth
                  onAsyncClick={async () => {
                    if (readerId) {
                      await dispatch(deleteReaderPhoto(readerId))
                    }
                  }}
                >
                  {t("common:deletePhoto")}
                </Button>
              </Box>
            )}
          </Box>
          <Grid container columnSpacing={1} rowSpacing={2} item lg={10}>
            <Grid item xs={6}>
              <FormikTextField
                disabled={isSubmitting}
                name="firstName"
                label={t("forms:labels.firstName")}
              />
            </Grid>
            <Grid item xs={6}>
              <FormikTextField
                disabled={isSubmitting}
                name="lastName"
                label={t("forms:labels.lastName")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                disabled={isSubmitting}
                inputProps={{
                  maxLength: 9,
                }}
                type="tel"
                name="phoneNumber"
                label={t("forms:labels.phoneNumber")}
                helperText={t("forms:helperTexts.phoneNumber")}
              />
            </Grid>
            <Grid item xs={12}>
              <FormikTextField
                disabled={isSubmitting}
                name="address.street"
                label={t("forms:labels.street")}
                helperText={t("forms:helperTexts.street")}
              />
            </Grid>
            <Grid item xs={7}>
              <FormikTextField
                disabled={isSubmitting}
                name="address.city"
                label={t("forms:labels.city")}
              />
            </Grid>
            <Grid item xs={5}>
              <FormikTextField
                disabled={isSubmitting}
                inputProps={{
                  maxLength: 6,
                  onKeyUp: handlePostalCodeKeyUp,
                  inputMode: "numeric",
                }}
                name="address.postalCode"
                label={t("forms:labels.postalCode")}
                helperText={t("forms:helperTexts.postalCode")}
              />
            </Grid>
            <Grid container spacing={1} item xs={12} md={6}>
              <Grid item xs>
                <Button
                  type="submit"
                  size="large"
                  fullWidth
                  isSubmitting={isSubmitting}
                  disabled={!dirty || isSubmitting}
                >
                  {t("common:submit")}
                </Button>
              </Grid>
              <Grid item xs>
                <Button
                  variant="outlined"
                  color="error"
                  size="large"
                  fullWidth
                  onClick={resetForm}
                  disabled={!dirty || isSubmitting}
                >
                  {t("common:reset")}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}
export default AddReaderForm
