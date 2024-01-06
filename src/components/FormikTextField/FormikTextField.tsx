import { Visibility, VisibilityOff } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton/IconButton"
import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import TextField, { TextFieldProps } from "@mui/material/TextField/TextField"
import { useField } from "formik"
import { useState } from "react"
import { useTranslation } from "react-i18next"

export interface FormikTextFieldProps
  extends Omit<
    TextFieldProps,
    "error" | "value" | "onChange" | "onBlur" | "InputProps" | "name"
  > {
  name: string
}

const FormikTextField = ({
  label,
  type = "text",
  variant = "outlined",
  helperText,
  disabled,
  fullWidth = true,
  name,
  ...restTextFieldProps
}: FormikTextFieldProps) => {
  const { t } = useTranslation(["forms"])
  const [showPassword, setShowPassword] = useState(false)
  const [field, meta] = useField(name)

  const handleClickShowPassword = () => setShowPassword((prev) => !prev)

  return (
    <TextField
      {...restTextFieldProps}
      disabled={disabled}
      variant={variant}
      label={label || name}
      fullWidth={fullWidth}
      id={name}
      name={name}
      type={type === "password" ? (showPassword ? "text" : "password") : type}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      helperText={
        (meta.touched && meta.error && t(meta.error)) ||
        (!meta.touched && helperText)
      }
      InputProps={
        type === "password"
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      handleClickShowPassword()
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
    />
  )
}

export default FormikTextField
