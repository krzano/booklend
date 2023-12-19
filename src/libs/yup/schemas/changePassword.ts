import yup from "../config"

const changePasswordSchema = yup.object().shape({
  newPassword: yup.string().password().required(),
  confirmNewPassword: yup.string().confirmPassword("newPassword").required(),
})

export type ChangePasswordFormValues = yup.InferType<
  typeof changePasswordSchema
>

export default changePasswordSchema
