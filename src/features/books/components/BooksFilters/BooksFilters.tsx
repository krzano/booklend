import { Grid } from "@mui/material"
import styled from "styled-components"
import Search from "../Search/Search"
import SortBy from "../SortBy/SortBy"
import GenresFilter from "../GenresFilter.tsx/GenresFilter"
import Button from "@/components/Button/Button"
import { useAppDispatch } from "@/app/hooks"
import { resetQueryParams } from "../../booksSilce"
import { useTranslation } from "react-i18next"

const BooksFilters = () => {
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  return (
    <StyledBooksFiltersGrid container spacing={2} alignItems={"center"}>
      <Grid item xs={6}>
        <Search />
      </Grid>
      <Grid item xs={6}>
        <GenresFilter />
      </Grid>
      <Grid item xs={6}>
        <SortBy />
      </Grid>
      <Grid item xs={6}>
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
    </StyledBooksFiltersGrid>
  )
}
const StyledBooksFiltersGrid = styled(Grid)`
  .MuiFormLabel-root::first-letter {
    text-transform: uppercase;
  }
`

export default BooksFilters
