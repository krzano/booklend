import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { useEffect } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { getSingleReader } from "../readersThunk"
import { READERS_PATH } from "@/constants/paths"
import Loader from "@/components/Loader/Loader"
import DataFetchingError from "@/components/DataFetchingError/DataFetchingError"
import Button from "@/components/Button/Button"
import ArrowBackIcon from "@mui/icons-material/ArrowBack"
import { useTranslation } from "react-i18next"
import { Avatar, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import { BASE_URL } from "@/constants/api"
import styled from "styled-components"
import ReadersBorrowedBooksSection from "@/features/lendBook/components/ReadersBorrowedBooksSection/ReadersBorrowedBooksSection"

const READER_PHOTO_WIDTH = 210

const SingleReader = () => {
  const { t } = useTranslation(["readers"])
  const { readerId } = useParams()
  const dispatch = useAppDispatch()
  const { status, singleReader } = useAppSelector((store) => store.readers)

  useEffect(() => {
    if (readerId) {
      dispatch(getSingleReader(readerId))
    }
  }, [readerId, dispatch])
  if (!readerId) return <Navigate to={READERS_PATH} />
  return status === "loading" ? (
    <Loader />
  ) : status === "failed" ? (
    <DataFetchingError />
  ) : singleReader ? (
    <Grid container spacing={4}>
      <Grid container spacing={4} item xs={12}>
        <Grid item xs={12} md={"auto"}>
          <Stack justifyContent={"center"} alignItems={"center"} spacing={1}>
            <Avatar
              src={
                singleReader.photo ? BASE_URL + singleReader.photo : undefined
              }
              variant="rounded"
              sx={{ width: READER_PHOTO_WIDTH, height: READER_PHOTO_WIDTH }}
            >
              <Typography
                textTransform={"uppercase"}
                fontSize={READER_PHOTO_WIDTH / 2}
              >
                {singleReader.firstName.slice(0, 1) +
                  singleReader.lastName.slice(0, 1)}
              </Typography>
            </Avatar>
            <div>
              <StyledChip label={"ID: " + singleReader._id} />
            </div>
          </Stack>
        </Grid>
        <Grid item xs={12} md>
          <Stack spacing={3} textAlign={"left"}>
            <Typography
              variant="h2"
              lineHeight={1.1}
              textAlign={{ xs: "center", md: "left" }}
              textTransform="capitalize"
            >
              {singleReader.firstName} {singleReader.lastName}
            </Typography>
            <Stack>
              <Typography variant="h5">{t("readers:phoneNumber")}:</Typography>
              <Typography variant="h5" fontWeight={300}>
                {singleReader.phoneNumber}
              </Typography>
            </Stack>
            <Stack>
              <Typography variant="h5">{t("readers:address")}:</Typography>
              <Typography
                variant="h5"
                fontWeight={300}
                textTransform={"capitalize"}
              >
                {singleReader.address.street}, {singleReader.address.postalCode}
                , {singleReader.address.city}
              </Typography>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <ReadersBorrowedBooksSection readerId={readerId} />
      </Grid>
    </Grid>
  ) : (
    <Button
      variant="outlined"
      size="large"
      startIcon={<ArrowBackIcon />}
      {...{ component: Link, to: READERS_PATH }}
    >
      {t("readers:backToReaders")}
    </Button>
  )
}

const StyledChip = styled(Chip)`
  padding: ${({ theme }) => theme.spacing(0.5)} 0;
  height: auto;
  width: ${READER_PHOTO_WIDTH}px;
  .MuiChip-label {
    display: block;
    overflow-wrap: break-word;
    white-space: normal;
  }
`

export default SingleReader
