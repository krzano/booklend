import yup from "../config"

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().password().required(),
  confirmPassword: yup.string().confirmPassword("password").required(),
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>

export default registerSchema
