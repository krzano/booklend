import InputAdornment from "@mui/material/InputAdornment/InputAdornment"
import TextField from "@mui/material/TextField/TextField"
import { useEffect, useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import { useTranslation } from "react-i18next"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { setQueryParams } from "../../booksSilce"

const Search = () => {
  const { t } = useTranslation(["forms"])
  const dispatch = useAppDispatch()
  const {
    queryParams: { search },
  } = useAppSelector((store) => store.books)
  const [searchTerm, setSearchTerm] = useState<string>(search || "")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setQueryParams({ search: searchTerm }))
    }, 800)
    return () => {
      clearInterval(timeoutId)
    }
  }, [searchTerm, dispatch])

  useEffect(() => {
    if (search !== undefined) {
      setSearchTerm(search)
    }
  }, [search])

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
export default Search
