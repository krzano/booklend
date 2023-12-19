import yup from "../config"

const changeUserInfoSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
})

export type ChangeUserInfoFormValues = yup.InferType<
  typeof changeUserInfoSchema
>

export default changeUserInfoSchema
