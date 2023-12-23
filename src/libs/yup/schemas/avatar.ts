import yup from "../config"

const avatarSchema = yup.object().shape({
  avatarImage: yup
    .mixed<File>()
    .image()
    .maxFileSize()
    .required("forms:errors.requiredImage"),
})

export type AvatarFormValues = yup.InferType<typeof avatarSchema>

export default avatarSchema
