import PageTitle from "@/components/PageTitle/PageTitle"
import { useTranslation } from "react-i18next"
import AddBookForm from "../components/AddBookForm/AddBookForm"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import { useEffect } from "react"
import { getAllGenres } from "@/features/genres/genresThunk"
import Loader from "@/components/Loader/Loader"

const AddBook = () => {
  const { t } = useTranslation(["books"])
  const dispatch = useAppDispatch()
  const { isGenresLoading, isGenresError, genres } = useAppSelector(
    (state) => state.genres,
  )
  useEffect(() => {
    if (!genres) {
      dispatch(getAllGenres())
    }
  }, [dispatch, genres])

  return (
    <>
      <PageTitle>{t("common:addNewBook")}</PageTitle>
      {isGenresLoading || !genres ? (
        isGenresError ? (
          <DataFetchingError
            refreshFunction={() => {
              dispatch(getAllGenres())
            }}
          />
        ) : (
          <Loader />
        )
      ) : (
        <AddBookForm genres={genres} />
      )}
    </>
  )
}
export default AddBook
