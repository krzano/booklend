import * as yup from "yup"

declare module "yup" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    password(): this
    confirmPassword(matchWith: string): this
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface MixedSchema<TType, TContext, TDefault, TFlags> {
    /**
     * @method
     * @description Check if the file is an image.
     *  */
    image(): this
    /**
     * @method
     * @description Check if the file size is smaller than default value or if provided, smaller than user's custom value.
     * @param maxSize maximum file size in MB, the default maxSize is 2MB
     * */
    maxFileSize(maxSize?: number): this
  }
}

const DEFAULT_MAX_FILE_SIZE = 2
const VALID_IMAGE_EXTENSIONS = ["jpg", "gif", "png", "jpeg", "svg", "webp"]

yup.addMethod(yup.string, "password", function password() {
  return this.min(8, "forms:errors.passwordMinLength").matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])((?=.*\W)|(?=.*_))^[^ ]+$/,
    "forms:errors.passwordRegExp",
  )
})
yup.addMethod(
  yup.string,
  "confirmPassword",
  function confirmPassword(matchWith: string) {
    return this.oneOf(
      [yup.ref(matchWith), ""],
      "forms:errors.confirmPasswordMatch",
    )
  },
)
yup.addMethod(yup.mixed<File>, "image", function image() {
  return this.test("is-valid-image", "forms:errors.notValidImage", (value) => {
    if (!value) return true
    const fileExtension = value.name.split(".").pop()
    return Boolean(
      fileExtension &&
        VALID_IMAGE_EXTENSIONS.find((extension) => extension === fileExtension),
    )
  })
})
yup.addMethod(
  yup.mixed<File>,
  "maxFileSize",
  function maxFileSize(maxSize?: number) {
    return this.test(
      "is-valid-size",
      maxSize ? `max ${maxSize}MB` : "forms:errors.maximumImageSize",
      (value) => {
        if (!value) return true
        const maxFileSize =
          (maxSize ? maxSize : DEFAULT_MAX_FILE_SIZE) * 1024 ** 2
        return value.size <= maxFileSize
      },
    )
  },
)

yup.setLocale({
  mixed: {
    required: "forms:errors.requiredField",
  },
  string: {
    email: "forms:errors.notValidEmail",
  },
})

export default yup
