import yup from "../config"

const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "forms:errors.passwordMinLength")
    .matches(
      /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/,
      "forms:errors.passwordRegExp",
    )
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "forms:errors.confirmPasswordMatch")
    .required(),
})

export type RegisterFormValues = yup.InferType<typeof registerSchema>

export default registerSchema
