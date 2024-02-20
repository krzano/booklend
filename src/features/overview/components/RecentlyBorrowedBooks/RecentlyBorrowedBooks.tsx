import { useAppSelector } from "@/app/hooks"
import Table from "@/components/Table/Table"
import truncateString from "@/utils/truncateString"
import Skeleton from "@mui/material/Skeleton/Skeleton"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import BookStatusChip from "@/components/BookStatusChip/BookStatusChip"
import { Avatar, Link as MuiLink, Stack, Typography } from "@mui/material"
import { Link as RouterLink } from "react-router-dom"
import { BOOKS_PATH, READERS_PATH } from "@/constants/paths"
import { BASE_URL } from "@/constants/api"

export interface RecentlyBorrowedBooksProps {}
const RecentlyBorrowedBooks = () => {
  const { t } = useTranslation(["overview"])
  const { status, recentlyBorrowedBooksList } = useAppSelector(
    (state) => state.overview,
  )
  return recentlyBorrowedBooksList ? (
    <Table
      variant="basic"
      title={t("overview:recentlyBorrowedBooks")}
      loading={status === "loading"}
      dataList={recentlyBorrowedBooksList}
      columns={[
        {
          key: "lendFrom",
          label: t("overview:from"),
          render: ({ lendFrom }) =>
            dayjs(lendFrom).format("LL").slice(0, -5).replace(",", ""),
          align: "center",
        },
        {
          key: "lendTo",
          label: t("overview:to"),
          render: ({ lendTo }) => dayjs(lendTo).format("LL"),
          align: "center",
        },
        {
          key: "lendStatus",
          label: "status",
          render: ({ bookId, lendStatus }) => (
            <BookStatusChip bookId={bookId} lendStatus={lendStatus} />
          ),
          align: "center",
        },
        {
          key: "bookData.title",
          label: t("common:title"),
          render: ({ bookId, bookData: { title } }) => (
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
          key: "bookData.author",
          label: t("common:author"),
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
          key: "readerData.name",
          label: t("common:reader"),
          render: ({
            readerId,
            readerData: { firstName, lastName, photo },
          }) => (
            <Stack direction={"row"} alignItems={"center"} gap={2}>
              <MuiLink
                component={RouterLink}
                to={`${READERS_PATH}/${readerId}`}
                underline="none"
              >
                <Avatar
                  src={photo ? BASE_URL + photo : ""}
                  variant="rounded"
                  sx={{ width: 36, height: 36 }}
                >
                  <Typography>
                    {firstName.slice(0, 1)}
                    {lastName.slice(0, 1)}
                  </Typography>
                </Avatar>
              </MuiLink>
              <MuiLink
                component={RouterLink}
                to={`${READERS_PATH}/${readerId}`}
                underline="hover"
              >
                <Typography>
                  {firstName} {lastName}
                </Typography>
              </MuiLink>
            </Stack>
          ),
        },
      ]}
    />
  ) : (
    <Skeleton variant="rounded" width={"100%"} height={300} />
  )
}

export default RecentlyBorrowedBooks
