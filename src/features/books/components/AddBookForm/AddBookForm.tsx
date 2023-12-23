import FormikFileInput from "@/components/FormikFileInput/FormikFileInput"
import FormikRatingField from "@/components/FormikRatingField/FormikRatingField"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import Box from "@mui/material/Box/Box"
import Grid from "@mui/material/Grid/Grid"
import BookCoverUploadBox from "../BookCoverUploadBox/BookCoverUploadBox"
import { Form, Formik } from "formik"
import Loader from "@/components/Loader/Loader"
import addBookSchema, { AddBookFormValues } from "@/libs/yup/schemas/addBook"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useTranslation } from "react-i18next"
import { addBook, getAllBooks } from "../../booksThunk"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import Button from "@/components/Button/Button"
import { useEffect } from "react"
import { getAllGenres } from "@/features/genres/genresThunk"
import { Navigate } from "react-router-dom"
import { DASHBOARD_PATH } from "@/constants/paths"

const AddBookForm = () => {
  const { t } = useTranslation(["forms", "genres"])
  const dispatch = useAppDispatch()
  const { isGenresLoading, isGenresError, genres } = useAppSelector(
    (state) => state.genres,
  )

  const initialValues: AddBookFormValues = {
    bookCoverImage: undefined,
    title: "",
    author: "",
    description: "",
    rating: 0,
    numberOfPages: 0,
    genre: [],
  }

  useEffect(() => {
    if (!genres) {
      dispatch(getAllGenres())
      dispatch(getAllBooks())
    }
  }, [dispatch, genres])

  if (isGenresLoading || !genres)
    return isGenresError ? <Navigate to={DASHBOARD_PATH} /> : <Loader />

  const genresSelectOptions = genres.map((item) => ({
    key: item._id,
    value: item.genreTranslationKey,
    label: t(`genres:${item.genreTranslationKey}`),
  }))
  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          await dispatch(addBook(values))
          actions.resetForm()
        }}
        validationSchema={addBookSchema}
      >
        {({ isSubmitting, dirty, resetForm, values }) => (
          <Form>
            <Grid container spacing={2} lg={10}>
              <Grid item xs={12} md="auto">
                <Box
                  display={"flex"}
                  justifyContent={{ xs: "center", md: "start" }}
                  alignItems={"center"}
                >
                  <FormikFileInput
                    sx={{ maxWidth: 200 }}
                    name="bookCoverImage"
                    accept="image/*"
                    disabled={isSubmitting}
                  >
                    <BookCoverUploadBox
                      bookCoverImage={values.bookCoverImage}
                    />
                  </FormikFileInput>
                </Box>
              </Grid>
              <Grid container spacing={2} item xs={12} md>
                <Grid item xs={12} md={"auto"}>
                  <Box display="grid" justifyContent={"center"}>
                    <FormikRatingField
                      name="rating"
                      label={t("forms:labels.rating")}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name="title"
                    label={t("forms:labels.title")}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormikTextField
                    name="author"
                    label={t("forms:labels.author")}
                    variant="filled"
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormikTextField
                    name="genre"
                    label={t("forms:labels.genre")}
                    select
                    SelectProps={{ native: false, multiple: true }}
                    variant="filled"
                  >
                    {genresSelectOptions.map(({ key, value, label }) => (
                      <MenuItem key={key} value={value}>
                        {label}
                      </MenuItem>
                    ))}
                  </FormikTextField>
                </Grid>
                <Grid item xs={6}>
                  <FormikTextField
                    name="numberOfPages"
                    label={t("forms:labels.numberOfPages")}
                    type="number"
                    variant="filled"
                  />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <FormikTextField
                  name="description"
                  label={t("forms:labels.description")}
                  variant="filled"
                  multiline
                  rows={4}
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
                    {t("common:addBook")}
                  </Button>
                </Grid>
                <Grid item xs>
                  <Button
                    variant="outlined"
                    color="error"
                    size="large"
                    fullWidth
                    onClick={resetForm}
                    isSubmitting={isSubmitting}
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
    </div>
  )
}
export default AddBookForm
