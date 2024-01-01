import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAllGenres } from "@/features/genres/genresThunk"
import { InputAdornment, Skeleton } from "@mui/material"
import Checkbox from "@mui/material/Checkbox/Checkbox"
import FormControl from "@mui/material/FormControl/FormControl"
import InputLabel from "@mui/material/InputLabel/InputLabel"
import ListItemText from "@mui/material/ListItemText/ListItemText"
import MenuItem from "@mui/material/MenuItem/MenuItem"
import OutlinedInput from "@mui/material/OutlinedInput/OutlinedInput"
import Select, { SelectChangeEvent } from "@mui/material/Select/Select"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import FilterListIcon from "@mui/icons-material/FilterList"
import { setQueryParams } from "../../booksSilce"

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
}

const GenresFilter = () => {
  const { t } = useTranslation(["genres", "forms"])
  const dispatch = useAppDispatch()
  const { genres } = useAppSelector((store) => store.genres)
  const {
    queryParams: { genre },
  } = useAppSelector((store) => store.books)
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    genre && typeof genre === "string" ? genre.split("_") : [],
  )

  const handleChange = (event: SelectChangeEvent<typeof selectedGenres>) => {
    const {
      target: { value },
    } = event
    setSelectedGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value,
    )
  }
  useEffect(() => {
    dispatch(getAllGenres())
  }, [dispatch])

  useEffect(() => {
    dispatch(setQueryParams({ genre: selectedGenres }))
  }, [selectedGenres, dispatch])

  useEffect(() => {
    setSelectedGenres(
      genre && typeof genre === "string" ? genre.split("_") : [],
    )
  }, [genre])

  return genres ? (
    <div>
      <FormControl fullWidth size="small">
        <InputLabel id="genres-filter-label">
          {t("forms:labels.genre")}
        </InputLabel>
        <Select
          startAdornment={
            <InputAdornment position="start">
              <FilterListIcon />
            </InputAdornment>
          }
          labelId="genres-filter-label"
          id="genres-filter"
          multiple
          value={selectedGenres}
          onChange={handleChange}
          input={<OutlinedInput label={t("forms:labels.genre")} />}
          renderValue={(selected) => {
            const translatedSelected = selected.map((genre) =>
              t(`genres:${genre}`),
            )
            return translatedSelected.join(", ")
          }}
          MenuProps={MenuProps}
        >
          {genres.map((genre) => (
            <MenuItem
              key={genre.genreTranslationKey}
              value={genre.genreTranslationKey}
            >
              <Checkbox
                checked={selectedGenres.indexOf(genre.genreTranslationKey) > -1}
              />
              <ListItemText
                primary={t(`genres:${genre.genreTranslationKey}`)}
              />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  ) : (
    <Skeleton variant="rounded" height={40} />
  )
}
export default GenresFilter
