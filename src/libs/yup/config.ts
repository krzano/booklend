import * as yup from "yup"

declare module "yup" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface StringSchema<TType, TContext, TDefault, TFlags> {
    password(): this
    confirmPassword(matchWith: string): this
  }
}

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

yup.setLocale({
  mixed: {
    required: "forms:errors.requiredField",
  },
  string: {
    email: "forms:errors.notValidEmail",
  },
})

export default yup
