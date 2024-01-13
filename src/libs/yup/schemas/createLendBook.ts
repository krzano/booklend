import yup from "../config"

const createLendBook = yup.object().shape({
  readerId: yup.string().required("forms:errors.chooseReader"),
  lendFrom: yup.string().required(),
  lendTo: yup.string().required(),
})

export type CreateLendBookValues = yup.InferType<typeof createLendBook>

export default createLendBook
