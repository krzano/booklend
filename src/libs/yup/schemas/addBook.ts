import yup from "../config"

const addBookSchema = yup.object().shape({
  bookCoverImage: yup.mixed<File>().image().maxFileSize(),
  title: yup.string().required(),
  author: yup.string().required(),
  description: yup.string().min(10, "forms:errors.minDescription").required(),
  rating: yup.number().required().min(1, "forms:errors.minRating").max(5),
  numberOfPages: yup
    .number()
    .positive("forms:errors.positivePagesNumber")
    .required(),
  genre: yup
    .array()
    .of(yup.string())
    .min(1, "forms:errors.minGenre")
    .required(),
})

export type AddBookFormValues = yup.InferType<typeof addBookSchema>

export default addBookSchema
