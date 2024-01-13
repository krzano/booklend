import Button from "@/components/Button/Button"
import { GetSingleLendBookResponse } from "@/types/api"
import {
  Avatar,
  Box,
  Divider,
  InputAdornment,
  Paper,
  Stack,
  Typography,
} from "@mui/material"
import { DateField } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import styled, { css } from "styled-components"
import TodayIcon from "@mui/icons-material/Today"
import EventIcon from "@mui/icons-material/Event"
import { BASE_URL } from "@/constants/api"
import { useAppDispatch } from "@/app/hooks"
import { updateLendBook } from "../../lendBookThunk"
import { useTranslation } from "react-i18next"
import ExtendLendingPeriod from "../ExtendLendingPeriod/ExtendLendingPeriod"
import { READERS_PATH } from "@/constants/paths"
import { Link } from "react-router-dom"

interface LendBookStatusManagementProps {
  lendBookData: GetSingleLendBookResponse
}
const USER_PHOTO_SIZE = 60

const LendBookStatusManagement = ({
  lendBookData,
}: LendBookStatusManagementProps) => {
  const { t } = useTranslation(["lendBook"])
  const dispatch = useAppDispatch()

  const {
    _id,
    bookId,
    lendFrom,
    lendTo,
    readerId,
    readerData: {
      photo,
      firstName,
      lastName,
      phoneNumber,
      address: { street, city, postalCode },
    },
  } = lendBookData
  return (
    <StyledPaper variant="outlined">
      <Stack spacing={3} mb={4}>
        <div>
          <Typography mb={1}>{t("lendBook:readerDetails")}:</Typography>
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar
              variant="rounded"
              src={photo ? photo + BASE_URL : undefined}
              component={Link}
              to={`${READERS_PATH}/${readerId}`}
              sx={{
                width: USER_PHOTO_SIZE,
                height: USER_PHOTO_SIZE,
                textDecoration: "none",
              }}
            >
              {firstName.slice(0, 1)}
              {lastName.slice(0, 1)}
            </Avatar>
            <Box sx={{ color: (theme) => theme.palette.grey[600] }}>
              <Typography fontSize={22} color={"inherit"}>
                {firstName} {lastName}
              </Typography>
              <Typography>ID: {readerId}</Typography>
              <Typography>tel. {phoneNumber}</Typography>
              <Typography>
                <Typography component="span">
                  {t("lendBook:address")}:
                </Typography>{" "}
                {street}, {postalCode}, {city}
              </Typography>
            </Box>
          </Stack>
        </div>
        <div>
          <Typography mb={2}>{t("lendBook:lendingPeriod")}:</Typography>
          <Stack direction="row" spacing={1}>
            <DateField
              fullWidth
              label={t("lendBook:start")}
              readOnly
              value={dayjs(lendFrom)}
              format="LL"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <TodayIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
            <DateField
              fullWidth
              label={t("lendBook:end")}
              readOnly
              value={dayjs(lendTo)}
              format="LL"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EventIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </div>
      </Stack>
      <Stack spacing={2} justifyContent="center" alignItems="center">
        <Button
          fullWidth
          size="large"
          color="success"
          variant="outlined"
          onAsyncClick={async () => {
            await dispatch(
              updateLendBook({
                lendBookId: _id,
                newLendBookData: {
                  bookId,
                  readerId,
                  lendFrom,
                  lendTo: dayjs().toISOString(),
                  lendStatus: "available",
                },
              }),
            )
          }}
        >
          {t("lendBook:confirmBookReturn")}
        </Button>
        <Box width={1 / 2}>
          <Divider>
            <Typography
              fontSize={12}
              textTransform="uppercase"
              color={(theme) => theme.palette.grey[500]}
            >
              {t("common:or")}
            </Typography>
          </Divider>
        </Box>
        <ExtendLendingPeriod
          lendBookId={_id}
          bookId={bookId}
          readerId={readerId}
          lendFrom={lendFrom}
          lendTo={lendTo}
        />
      </Stack>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)`
  ${({ theme }) => css`
    padding: ${theme.spacing(3)};
    max-width: 600px;
    background-color: ${theme.palette.background.default};
  `}
`

export default LendBookStatusManagement
