import yup from "../config"

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8, "forms:errors.passwordMinLength").required(),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

export default loginSchema
