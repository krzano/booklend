import { Checkbox, ListItemText, TextField } from "@mui/material"
import FormControl from "@mui/material/FormControl/FormControl"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import Select, { SelectProps } from "@mui/material/Select/Select"
import { useField } from "formik"

interface Option {
  key: string
  value: string | number
  label: string
}

export type FormikSelectOptionsList = Option[]

interface FormikSelectFieldProps
  extends Pick<SelectProps, "multiple" | "variant"> {
  name: string
  options: FormikSelectOptionsList
}

const FormikSelectField = ({
  name,
  options,
  multiple,
  variant,
}: FormikSelectFieldProps) => {
  const [field, meta, helpers] = useField(name)

  if (true)
    return (
      <StyledTextField
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
      ></StyledTextField>
    )

  return (
    <FormControl variant={variant} sx={{ m: 1, minWidth: 120 }}>
      <Select
        labelId={name + "-select-label"}
        id={name}
        name={name}
        multiple={multiple}
        value={[]}
        onChange={field.onChange}
        onBlur={field.onBlur}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map(({ key, value, label }) => (
          <MenuItem key={key} value={value}>
            <Checkbox checked={meta.value.indexOf(value) > -1} />
            <ListItemText>{label}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
export default FormikSelectField
