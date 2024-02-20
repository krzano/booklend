import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { getReadersBorrowedBooks } from "../../lendBookThunk"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import { useEffect, useState } from "react"
import Loader from "@/components/Loader/Loader"
import Table from "@/components/Table/Table"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"
import { GetLendBookHistoryQueryParams } from "@/types/api"
import truncateString from "@/utils/truncateString"
import { Link as MuiLink, MenuItem, TextField, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { BOOKS_PATH } from "@/constants/paths"
import BookStatusChip from "@/components/BookStatusChip/BookStatusChip"

interface ReadersBorrowedBooksSectionProps {
  readerId: string
}
const ReadersBorrowedBooksSection = ({
  readerId,
}: ReadersBorrowedBooksSectionProps) => {
  const { t } = useTranslation(["lendBook"])
  const [queryParams, setQueryParams] = useState<GetLendBookHistoryQueryParams>(
    {
      currentPage: 1,
      pageSize: 5,
      lendStatus: "all",
      sortBy: "createdAt",
      sortDirection: "desc",
    },
  )
  const dispatch = useAppDispatch()
  const { status, singleReadersBorrowedBooks } = useAppSelector(
    (store) => store.lendBook,
  )

  useEffect(() => {
    dispatch(getReadersBorrowedBooks({ readerId, queryParams }))
  }, [dispatch, readerId, queryParams])
  if (status === "loading" && !singleReadersBorrowedBooks) return <Loader />
  if (status === "failed")
    return (
      <DataFetchingError
        refreshFunction={() => {
          dispatch(getReadersBorrowedBooks({ readerId, queryParams }))
        }}
      />
    )
  if (!singleReadersBorrowedBooks) return null
  return (
    <div>
      <Table
        variant="advanced"
        title={t("lendBook:borrowedBooks")}
        refreshFunction={() => {
          dispatch(getReadersBorrowedBooks({ readerId, queryParams }))
        }}
        loading={status === "loading"}
        currentPage={queryParams.currentPage}
        pageSize={queryParams.pageSize}
        totalItems={singleReadersBorrowedBooks.totalItems}
        sortBy={queryParams.sortBy}
        sortDirection={queryParams.sortDirection}
        onPageChange={(newPage) => {
          setQueryParams((prev) => ({
            ...prev,
            currentPage: newPage,
          }))
        }}
        onPageSizeChange={(newPageSize) => {
          setQueryParams((prev) => ({
            ...prev,
            pageSize: newPageSize,
          }))
        }}
        onSortByChange={(sortByValue) => {
          setQueryParams((prev) => ({
            ...prev,
            sortBy: sortByValue,
          }))
        }}
        onSortDirectionChange={(sortDirectionValue) => {
          setQueryParams((prev) => ({
            ...prev,
            sortDirection: sortDirectionValue,
          }))
        }}
        filtersList={[
          <TextField
            sx={{ width: { xs: 80, sm: 140 }, flexShrink: 1 }}
            label={"Status"}
            size="small"
            select
            value={queryParams.lendStatus}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQueryParams((prev) => ({
                ...prev,
                lendStatus:
                  event.target.value === "borrowed"
                    ? "borrowed"
                    : event.target.value === "available"
                    ? "available"
                    : "all",
              }))
            }}
          >
            <MenuItem value="all">
              <Typography color={(theme) => theme.palette.grey[500]}>
                {t("lendBook:all")}
              </Typography>
            </MenuItem>
            <MenuItem value="borrowed">
              <Typography variant="button">{t("lendBook:borrowed")}</Typography>
            </MenuItem>
            <MenuItem value="available">
              <Typography variant="button">{t("lendBook:returned")}</Typography>
            </MenuItem>
          </TextField>,
        ]}
        dataList={singleReadersBorrowedBooks.data}
        columns={[
          {
            label: t("lendBook:title"),
            key: "bookData.title",
            isSortable: false,
            render: ({ bookData: { title }, bookId }) => (
              <MuiLink
                fontSize={16}
                fontFamily={(theme) => theme.otherFonts.serif}
                fontWeight={500}
                underline="hover"
                component={RouterLink}
                to={`${BOOKS_PATH}/${bookId}`}
              >
                {truncateString(title, 22)}
              </MuiLink>
            ),
          },
          {
            label: t("lendBook:author"),
            key: "bookData.author",
            isSortable: false,
            render: ({ bookData: { author } }) => (
              <Typography
                fontSize={14}
                fontFamily={(theme) => theme.otherFonts.serif}
              >
                {author}
              </Typography>
            ),
          },
          {
            label: "status",
            key: "lendStatus",
            isSortable: true,
            render: ({ lendStatus, bookId }) => (
              <BookStatusChip bookId={bookId} lendStatus={lendStatus} />
            ),
            align: "center",
          },
          {
            label: t("lendBook:borrowedOn"),
            key: "createdAt",
            isSortable: true,
            render: ({ createdAt }) => dayjs(createdAt).format("L").toString(),
          },
          {
            label: t("lendBook:borrowingPeriod"),
            key: "lendTo",
            isSortable: true,
            render: ({ lendFrom, lendTo }) => (
              <Typography fontSize={14} textTransform={"capitalize"}>
                {t("lendBook:from")}:&nbsp;
                <Typography
                  component="span"
                  fontSize={"inherit"}
                  fontWeight={500}
                >
                  {dayjs(lendFrom).format("L").toString()}
                </Typography>{" "}
                {t("lendBook:to")}:&nbsp;
                <Typography
                  component="span"
                  fontSize={"inherit"}
                  fontWeight={500}
                >
                  {dayjs(lendTo).format("L").toString()}
                </Typography>
              </Typography>
            ),
          },
        ]}
      />
    </div>
  )
}

export default ReadersBorrowedBooksSection
