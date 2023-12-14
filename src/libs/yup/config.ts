import * as yup from "yup"

yup.setLocale({
  mixed: {
    required: "forms:errors.requiredField",
  },
})

export default yup
