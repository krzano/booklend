import { Grid } from "@mui/material"
import SortBy from "../SortBy/SortBy"
import GenresFilter from "../GenresFilter.tsx/GenresFilter"
import Button from "@/components/Button/Button"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { resetQueryParams, setQueryParams } from "../../booksSilce"
import { useTranslation } from "react-i18next"
import SearchField from "@/components/SearchField/SearchField"

const BooksFilters = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const search = useAppSelector((store) => store.books.queryParams.search)
  return (
    <Grid container spacing={2} alignItems={"center"}>
      <Grid item xs={6} md={4} lg={3}>
        <SearchField
          search={search}
          onSearchChange={(searchTerm) => {
            dispatch(setQueryParams({ search: searchTerm }))
          }}
        />
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <GenresFilter />
      </Grid>
      <Grid item xs={6} md={4} lg={3}>
        <SortBy />
      </Grid>
      <Grid item xs={6} md="auto" lg={3}>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            dispatch(resetQueryParams())
          }}
        >
          {t("common:clearFilters")}
        </Button>
      </Grid>
    </Grid>
  )
}

export default BooksFilters
