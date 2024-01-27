import { useAppDispatch, useAppSelector } from "@/app/hooks"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import { BOOKS_PATH } from "@/constants/paths"
import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { editBook, getSingleBook } from "../booksThunk"
import Loader from "@/components/Loader/Loader"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useTranslation } from "react-i18next"
import AddBookForm from "../components/AddBookForm/AddBookForm"
import { getAllGenres } from "@/features/genres/genresThunk"
import { BASE_URL } from "@/constants/api"
import Button from "@/components/Button/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"

const EditBook = () => {
  const { t } = useTranslation(["books"])
  const { bookId } = useParams()
  const dispatch = useAppDispatch()
  const { status: booksStatus, singleBook } = useAppSelector(
    (store) => store.books,
  )
  const { status: genresStatus, genres } = useAppSelector(
    (store) => store.genres,
  )

  useEffect(() => {
    if (bookId) {
      dispatch(getSingleBook(bookId))
    }
    dispatch(getAllGenres())
  }, [bookId, dispatch])

  if (!bookId) return <Navigate to={BOOKS_PATH} />
  return booksStatus === "loading" ? (
    <Loader />
  ) : booksStatus === "failed" ? (
    <DataFetchingError
      refreshFunction={() => {
        dispatch(getSingleBook(bookId))
      }}
    />
  ) : singleBook ? (
    <>
      <PageTitle>{t("common:editBook")}</PageTitle>
      {genresStatus === "loading" || !genres ? (
        genresStatus === "failed" ? (
          <DataFetchingError
            refreshFunction={() => {
              dispatch(getAllGenres())
            }}
          />
        ) : (
          <Loader />
        )
      ) : (
        <AddBookForm
          coverImgSrc={
            singleBook.photo ? `${BASE_URL}${singleBook.photo}` : undefined
          }
          genres={genres}
          initialValues={{
            bookCoverImage: undefined,
            title: singleBook.title,
            author: singleBook.author,
            description: singleBook.description,
            rating: singleBook.rating,
            numberOfPages: singleBook.numberOfPages,
            genre: singleBook.genre,
          }}
          onSubmit={async (values, actions) => {
            await dispatch(
              editBook({ bookId: singleBook._id, editBookValues: values }),
            )
            actions.resetForm()
          }}
        />
      )}
    </>
  ) : (
    <Button
      variant="outlined"
      size="large"
      startIcon={<ArrowBackIcon />}
      {...{ component: Link, to: BOOKS_PATH }}
    >
      {t("books:backToBooks")}
    </Button>
  )
}
export default EditBook
