import { useAppDispatch, useAppSelector } from "@/app/hooks"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useEffect } from "react"
import { useTranslation } from "react-i18next"
import { getBooks } from "../booksThunk"
import { Link as RouterLink } from "react-router-dom"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import Loader from "@/components/Loader/Loader"
import Section from "@/components/Section/Section"
import { Box, Pagination, Stack, Typography } from "@mui/material"
import BooksListView from "../components/BooksListView/BooksListView"
import styled from "styled-components"
import BooksFilters from "../components/BooksFilters/BooksFilters"
import { setQueryParams } from "../booksSilce"
import Button from "@/components/Button/Button"
import { ADD_BOOK_PATH } from "@/constants/paths"
import ToggleViewSection from "../components/ToggleViewSection/ToggleViewSection"
import CustomBackdrop from "@/components/CustomBackdrop/CustomBackdrop"

const BooksList = () => {
  const dispatch = useAppDispatch()
  const {
    isBooksLoading,
    isBooksError,
    booksData,
    queryParams: {
      currentPage,
      pageSize,
      sortBy,
      sortDirection,
      genre,
      search,
    },
  } = useAppSelector((store) => store.books)
  const { t } = useTranslation(["books"])

  const handlePaginationChange = (
    _event: React.ChangeEvent<unknown>,
    value: number,
  ) => {
    dispatch(setQueryParams({ currentPage: value }))
  }

  useEffect(() => {
    dispatch(
      getBooks({ currentPage, pageSize, sortBy, sortDirection, genre, search }),
    )
  }, [currentPage, pageSize, sortBy, sortDirection, genre, search, dispatch])

  if (!booksData)
    return isBooksError ? (
      <DataFetchingError
        refreshFunction={() => {
          dispatch(
            getBooks({
              currentPage,
              pageSize,
              sortBy,
              sortDirection,
              genre,
              search,
            }),
          )
        }}
      />
    ) : (
      <Loader />
    )
  return (
    <>
      <PageTitle>{t("books:booksList")}</PageTitle>
      <Section>
        <BooksFilters />
        <Stack spacing={2} marginTop={3}>
          <ToggleViewSection />
          <Box position="relative">
            <CustomBackdrop open={isBooksLoading} rounded />
            {booksData.totalItems === 0 ? (
              <StyledNoBooksFoundBox>
                <Typography variant="h4" textAlign={"center"}>
                  {t("books:noBooksFound")}
                </Typography>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="large"
                  {...{ component: RouterLink, to: ADD_BOOK_PATH }}
                >
                  {t("books:addBook")}
                </Button>
              </StyledNoBooksFoundBox>
            ) : (
              <BooksListView booksList={booksData.booksList} />
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            {booksData.numOfPages > 0 && (
              <StyledPagination
                disabled={isBooksLoading}
                color="primary"
                page={currentPage}
                count={booksData.numOfPages}
                variant="outlined"
                size="large"
                onChange={handlePaginationChange}
              />
            )}
          </Box>
        </Stack>
      </Section>
    </>
  )
}

const StyledPagination = styled(Pagination)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  .MuiPaginationItem-root {
    font-size: 1.6rem;
    font-weight: 500;
    opacity: 0.9;
    font-family: ${({ theme }) => theme.typography.fontFamily};
  }
  .MuiPaginationItem-root.Mui-selected {
    opacity: 1;
  }
`

const StyledNoBooksFoundBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 6rem;
  text-align: center;
`

export default BooksList
