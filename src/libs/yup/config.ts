import * as yup from "yup"

yup.setLocale({
  mixed: {
    required: "forms:errors.requiredField",
  },
  string: {
    email: "forms:errors.notValidEmail",
  },
})

export default yup
