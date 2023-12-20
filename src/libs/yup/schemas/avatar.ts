import yup from "../config"

const MAX_FILE_SIZE = 2097152 //2MB
const validFileExtensions = ["jpg", "gif", "png", "jpeg", "svg", "webp"]

const avatarSchema = yup.object().shape({
  avatarImage: yup
    .mixed<File>()
    .required("forms:errors.requiredImage")
    .test("is-valid-extension", "forms:errors.notValidImage", (image: File) => {
      const fileExtension = image.name.split(".").pop()
      return Boolean(
        fileExtension &&
          validFileExtensions.find((extension) => extension === fileExtension),
      )
    })
    .test("is-valid-size", "forms:errors.maximumImageSize", (image: File) => {
      return image && image.size <= MAX_FILE_SIZE
    }),
})

export type AvatarFormValues = yup.InferType<typeof avatarSchema>

export default avatarSchema
