import styled from "styled-components"
import { GetBooksResponse } from "@/types/api"
import Grid from "@mui/material/Grid/Grid"
import ListViewBook from "../ListViewBook/ListViewBook"
import GridViewBook from "../GridViewBook/GridViewBook"
import { useAppSelector } from "@/app/hooks"
import { ViewVariants } from "../../booksSilce"

interface BooksListViewProps {
  booksList: GetBooksResponse["data"]
}
interface ViewProps {
  booksList: GetBooksResponse["data"]
}
const ListView = ({ booksList }: ViewProps) => {
  return (
    <Grid
      container
      columns={{ xs: 1, md: 2 }}
      rowSpacing={2}
      columnSpacing={{ xs: 0, md: 2 }}
    >
      {booksList.map((book) => (
        <Grid item xs={1} key={book._id}>
          <ListViewBook {...book} />
        </Grid>
      ))}
    </Grid>
  )
}
const GridView = ({ booksList }: ViewProps) => {
  return (
    <StyledGridView>
      {booksList.map((book) => (
        <GridViewBook key={book._id} {...book} />
      ))}
    </StyledGridView>
  )
}

const BooksListView = ({ booksList }: BooksListViewProps) => {
  const { view } = useAppSelector((store) => store.books)

  return view === ViewVariants.grid ? (
    <GridView booksList={booksList} />
  ) : (
    <ListView booksList={booksList} />
  )
}

const StyledGridView = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: stretch;
  gap: 2rem;
`

export default BooksListView
