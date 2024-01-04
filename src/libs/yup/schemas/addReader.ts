import yup from "../config"

const addReaderSchema = yup.object().shape({
  readerImage: yup.mixed<File>().image().maxFileSize(),
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  phoneNumber: yup.string().length(9, "forms:errors.phoneNumber").required(),
  address: yup.object({
    street: yup.string().required(),
    city: yup.string().required(),
    postalCode: yup.string().length(6, "forms:errors.postalCode").required(),
  }),
})

export type AddReaderFormValues = yup.InferType<typeof addReaderSchema>

export default addReaderSchema
