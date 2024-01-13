import { FormHelperText, PopperProps } from "@mui/material"
import Autocomplete from "@mui/material/Autocomplete/Autocomplete"
import TextField from "@mui/material/TextField/TextField"
import { useCallback, useEffect, useState } from "react"

interface AutocompleteSearchFieldProps<T> {
  id: string
  label?: string
  placeholder?: string
  onValueChange: (newValue: T | null) => void
  fetchOptions: (search: string) => Promise<T[]>
  getOptionLabel: (option: T) => string
  renderOptionContent?: (option: T) => React.ReactNode
  optionsPlacement?: PopperProps["placement"]
  error?: boolean
  helperText?: string
  disabled?: boolean
}

const AutocompleteSearchField = <T extends { _id: string }>({
  id,
  label,
  placeholder,
  onValueChange,
  fetchOptions,
  getOptionLabel,
  renderOptionContent,
  optionsPlacement,
  error,
  helperText,
  disabled,
}: AutocompleteSearchFieldProps<T>) => {
  const [value, setValue] = useState<T | null>(null)
  const [inputValue, setInputValue] = useState("")
  const [options, setOptions] = useState<T[]>([])
  const updateOptions = useCallback(
    async (search: string) => {
      const options = await fetchOptions(search)
      setOptions(value ? [value] : options)
    },
    [value, fetchOptions],
  )
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateOptions(inputValue)
    }, 500)
    return () => clearTimeout(timeoutId)
  }, [inputValue, updateOptions])
  return (
    <div>
      <Autocomplete
        id={id}
        getOptionLabel={getOptionLabel}
        isOptionEqualToValue={(option, value) => option._id === value._id}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        value={value}
        onChange={(_, newValue: T | null) => {
          setValue(newValue)
          onValueChange(newValue)
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue)
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            {renderOptionContent
              ? renderOptionContent(option)
              : getOptionLabel(option)}
          </li>
        )}
        componentsProps={{
          popper: {
            placement: optionsPlacement ? optionsPlacement : undefined,
          },
        }}
      />
      <FormHelperText sx={{ marginLeft: "14px" }} error={error}>
        {helperText}
      </FormHelperText>
    </div>
  )
}
export default AutocompleteSearchField
