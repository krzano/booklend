import FormikFileInput from "@/components/FormikFileInput/FormikFileInput"
import PageTitle from "@/components/PageTitle/PageTitle"
import addBookSchema, { AddBookFormValues } from "@/libs/yup/schemas/addBook"
import { Box, Grid, MenuItem } from "@mui/material"
import { Form, Formik } from "formik"
import BookCoverUploadBox from "../components/BookCoverUploadBox/BookCoverUploadBox"
import FormikTextField from "@/components/FormikTextField/FormikTextField"
import FormikRatingField from "@/components/FormikRatingField/FormikRatingField"
import { useTranslation } from "react-i18next"
import Button from "@/components/Button/Button"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { addBook, getAllBooks, getAllGenres } from "../booksThunk"
import Loader from "@/components/Loader/Loader"

const AddBook = () => {
  const { t } = useTranslation(["forms", "genres"])
  const dispatch = useAppDispatch()
  const { isBooksLoading, genres } = useAppSelector((state) => state.books)

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
    if (genres.length === 0) {
      dispatch(getAllGenres())
      dispatch(getAllBooks())
    }
  }, [dispatch, genres])

  if (isBooksLoading) return <Loader />

  const genresSelectOptions = genres.map((item) => ({
    key: item._id,
    value: item.genreTranslationKey,
    label: t(`genres:${item.genreTranslationKey}`),
  }))

  return (
    <>
      <PageTitle>{t("common:addNewBook")}</PageTitle>
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
    </>
  )
}
export default AddBook
