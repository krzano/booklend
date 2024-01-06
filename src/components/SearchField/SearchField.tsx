import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import TextField from "@mui/material/TextField/TextField"
import { useEffect, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { useTranslation } from "react-i18next"

interface SearchFieldProps {
  search: string
  onSearchChange: (searchTerm: string) => void
}
const SearchField = ({ onSearchChange, search }: SearchFieldProps) => {
  const { t } = useTranslation(["forms"])
  const [searchTerm, setSearchTerm] = useState<string>(search || "")

  useEffect(() => {
    if (searchTerm !== search) {
      const timeoutId = setTimeout(() => {
        onSearchChange(searchTerm)
      }, 800)
      return () => {
        clearInterval(timeoutId)
      }
    }
  }, [searchTerm, onSearchChange, search])

  return (
    <TextField
      id="search"
      type="search"
      label={t("forms:labels.search")}
      size="small"
      fullWidth
      value={searchTerm}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  )
}
export default SearchField
