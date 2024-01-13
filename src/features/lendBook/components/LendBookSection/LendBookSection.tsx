import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { getBookLendHistory } from "../../lendBookThunk"
import { Stack } from "@mui/material"
import Loader from "@/components/Loader/Loader"
import LendBookForm from "../LendBookForm/LendBookForm"
import BookStatusBox from "../BookStatusBox/BookStatusBox"
import LendBookStatusManagement from "../LendBookStatusManagement/LendBookStatusManagement"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"

interface LendBookSectionProps {
  bookId: string
}

const LendBookSection = ({ bookId }: LendBookSectionProps) => {
  const dispatch = useAppDispatch()
  const { status, singleBookLendHistory } = useAppSelector(
    (store) => store.lendBook,
  )
  useEffect(() => {
    dispatch(getBookLendHistory(bookId))
  }, [dispatch, bookId])

  if (status === "loading") return <Loader />
  if (status === "failed")
    return (
      <DataFetchingError
        refreshFunction={() => {
          dispatch(getBookLendHistory(bookId))
        }}
      />
    )
  if (!singleBookLendHistory) return null
  const borrowedItemLendBookData = singleBookLendHistory.data.find(
    (item) => item.lendStatus === "borrowed",
  )
  if (
    borrowedItemLendBookData &&
    borrowedItemLendBookData.bookData._id !== bookId
  )
    return null
  return borrowedItemLendBookData ? (
    <Stack spacing={2}>
      <BookStatusBox status="borrowed" />
      <LendBookStatusManagement lendBookData={borrowedItemLendBookData} />
    </Stack>
  ) : (
    <Stack spacing={2}>
      <BookStatusBox status="available" />
      <LendBookForm bookId={bookId} />
    </Stack>
  )
}
export default LendBookSection
