import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import CurrentTime from "../components/CurrentTime/CurrentTime"
import { useEffect } from "react"
import { getOverviewStats } from "../overviewThunk"

import RecentlyBorrowedBooks from "../components/RecentlyBorrowedBooks/RecentlyBorrowedBooks"
import TopGenres from "../components/TopGenres/TopGenres"
import LibraryStats from "../components/LibraryStats/LibraryStats"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"

const Overview = () => {
  const { t } = useTranslation(["overview"])
  const dispatch = useAppDispatch()
  const firstName = useAppSelector((store) => store.user.userData.firstName)
  const status = useAppSelector((state) => state.overview.status)

  useEffect(() => {
    dispatch(getOverviewStats())
  }, [dispatch])

  return (
    <>
      <Stack marginBottom={4}>
        <Typography variant="h3" component={"h2"}>
          {t("overview:welcome")} {firstName}!
        </Typography>
        <CurrentTime />
      </Stack>
      {status === "failed" ? (
        <DataFetchingError
          refreshFunction={() => {
            dispatch(getOverviewStats())
          }}
        />
      ) : (
        <Stack gap={{ xs: 4, md: 5 }}>
          <Stack direction={"row"} flexWrap={"wrap"} gap={{ xs: 4, md: 5 }}>
            <LibraryStats />
            <TopGenres />
          </Stack>
          <RecentlyBorrowedBooks />
        </Stack>
      )}
    </>
  )
}

export default Overview
