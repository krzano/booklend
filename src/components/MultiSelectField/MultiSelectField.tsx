import { FilledInput, Input, InputAdornment } from "@mui/material"
import Checkbox from "@mui/material/Checkbox/Checkbox"
import FormControl, {
  FormControlProps,
} from "@mui/material/FormControl/FormControl"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import ListItemText from "@mui/material/ListItemText/ListItemText"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"
import Select, {
  SelectChangeEvent,
  SelectProps,
} from "@mui/material/Select/Select"
import { useTranslation } from "react-i18next"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}
// TODO TO DO: add JSDoc comments
interface MultiSelectFieldProps {
  id: string
  options: string[]
  translationNamespaces?: string[] | string
  selectedValues: string[]
  setSelectedValues: React.Dispatch<React.SetStateAction<string[]>>
  label: string
  renderValue?: SelectProps<string[]>["renderValue"]
  icon?: React.ReactElement
  fullWidth?: FormControlProps["fullWidth"]
  size?: FormControlProps["size"]
  variant?: FormControlProps["variant"]
}

const MultiSelectField = ({
  id,
  options,
  selectedValues,
  setSelectedValues,
  label,
  renderValue,
  translationNamespaces,
  fullWidth,
  size,
  variant = "outlined",
  icon,
}: MultiSelectFieldProps) => {
  const { t } = useTranslation(translationNamespaces)
  const handleChange = (event: SelectChangeEvent<typeof selectedValues>) => {
    const {
      target: { value },
    } = event
    setSelectedValues(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    )
  }

  return (
    <div>
      <FormControl variant={variant} fullWidth={fullWidth} size={size}>
        <InputLabel id={`${id}-label`}>{label}</InputLabel>
        <Select
          startAdornment={
            icon ? (
              <InputAdornment position="start">{icon}</InputAdornment>
            ) : undefined
          }
          labelId={`${id}-label`}
          id={id}
          multiple
          value={selectedValues}
          onChange={handleChange}
          input={
            variant === "filled" ? (
              <FilledInput />
            ) : (
              <OutlinedInput label={label} />
            )
          }
          renderValue={
            renderValue
              ? renderValue
              : (selected) => selected.map((item) => t(item)).join(", ")
          }
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={selectedValues.indexOf(option) > -1} />
              <ListItemText primary={t(option)} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
export default MultiSelectField
