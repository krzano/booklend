import yup from "../config"

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().password().required(),
})

export type LoginFormValues = yup.InferType<typeof loginSchema>

export default loginSchema
