import {
  DatePickerProps as MuiDatePickerProps,
  DatePicker as MuiDatePicker,
} from "@mui/x-date-pickers/DatePicker"
import { Dayjs } from "dayjs"
import "dayjs/locale/pl"
import { TextFieldProps } from "@mui/material"

interface DatePickerProps {
  id: string
  name?: string
  label: string
  value: MuiDatePickerProps<Dayjs>["value"]
  onChange: MuiDatePickerProps<Dayjs>["onChange"]
  textFieldProps?: TextFieldProps
  disablePast?: boolean
  disableFuture?: boolean
  minDate?: MuiDatePickerProps<Dayjs>["minDate"]
  maxDate?: MuiDatePickerProps<Dayjs>["maxDate"]
}

const DatePicker = ({
  id,
  name,
  label,
  value,
  onChange,
  textFieldProps,
  ...props
}: DatePickerProps) => {
  return (
    <MuiDatePicker
      {...props}
      name={name}
      label={label}
      value={value}
      onChange={onChange}
      formatDensity="spacious"
      slotProps={{
        textField: {
          id,
          fullWidth: true,
          ...textFieldProps,
        },
      }}
    />
  )
}

export default DatePicker
