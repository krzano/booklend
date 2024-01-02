import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getAllGenres } from "@/features/genres/genresThunk"
import { Skeleton } from "@mui/material"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import FilterListIcon from "@mui/icons-material/FilterList"
import { setQueryParams } from "../../booksSilce"
import MultiSelectField from "@/components/MultiSelectField/MultiSelectField"

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

  useEffect(() => {
    dispatch(getAllGenres())
  }, [dispatch])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(setQueryParams({ genre: selectedGenres }))
    }, 700)
    return () => {
      clearInterval(timeoutId)
    }
  }, [selectedGenres, dispatch])

  useEffect(() => {
    setSelectedGenres(
      genre && typeof genre === "string" ? genre.split("_") : [],
    )
  }, [genre])

  return genres ? (
    <MultiSelectField
      id="genres-filter"
      label={t("forms:labels.genre")}
      selectedValues={selectedGenres}
      setSelectedValues={setSelectedGenres}
      icon={<FilterListIcon />}
      options={genres.map((item) => item.genreTranslationKey)}
      translationNamespaces={"genres"}
      fullWidth
      size="small"
    />
  ) : (
    <Skeleton variant="rounded" height={40} />
  )
}
export default GenresFilter
