import { useAppDispatch } from "@/app/hooks"
import Button from "@/components/Button/Button"
import { BASE_URL, READERS_ENDPOINT } from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { GetReadersResponse } from "@/types/api"
import { Avatar, Box, Grid, Paper, Stack, Typography } from "@mui/material"
import { createLendBook } from "../../lendBookThunk"
import AutocompleteSearchField from "@/components/AutocompleteSearchField/AutocompleteSearchField"
import dayjs from "dayjs"
import "dayjs/locale/pl"
import { Form, Formik } from "formik"
import createLendBookSchema, {
  CreateLendBookValues,
} from "@/libs/yup/schemas/createLendBook"
import DatePicker from "@/components/DatePicker/DatePicker"
import { useTranslation } from "react-i18next"

interface LendBookFormProps {
  bookId: string
}

const fetchReaders = async (search: string) => {
  try {
    const { data } = await axiosProtectedInstance.get<GetReadersResponse>(
      READERS_ENDPOINT,
      {
        params: {
          currentPage: 1,
          pageSize: 10 ** 10,
          sortBy: "firstName",
          sortDirection: "asc",
          search,
        },
      },
    )
    return data.data
  } catch (error) {
    return Promise.reject(error)
  }
}

const todayDateString = dayjs().toISOString()

const LendBookForm = ({ bookId }: LendBookFormProps) => {
  const { t } = useTranslation(["forms", "lendBook"])
  const dispatch = useAppDispatch()

  const initialValues: CreateLendBookValues = {
    readerId: "",
    lendFrom: todayDateString,
    lendTo: "",
  }

  return (
    <Paper
      variant="outlined"
      sx={{
        py: 4,
        px: 2,
        maxWidth: 600,
        backgroundColor: (theme) => theme.palette.background.default,
      }}
    >
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          await dispatch(
            createLendBook({
              bookId,
              readerId: values.readerId,
              lendFrom: values.lendFrom,
              lendTo: values.lendTo,
            }),
          )
        }}
        validationSchema={createLendBookSchema}
        validateOnChange={false}
      >
        {({ isSubmitting, values, errors, setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography fontSize={18} mb={2}>
                  {t("lendBook:chooseReader")}
                </Typography>
                <AutocompleteSearchField
                  id="reader-select"
                  placeholder={t("lendBook:search")}
                  onValueChange={(newValue) => {
                    setFieldValue("readerId", newValue ? newValue._id : "")
                  }}
                  fetchOptions={fetchReaders}
                  optionsPlacement="top"
                  getOptionLabel={({ firstName, lastName, phoneNumber }) =>
                    `${firstName} ${lastName} (tel. ${phoneNumber})`
                  }
                  renderOptionContent={({
                    photo,
                    firstName,
                    lastName,
                    phoneNumber,
                  }) => (
                    <Stack direction="row" gap={2} alignItems="center" py={1}>
                      <Avatar
                        src={photo ? BASE_URL + photo : undefined}
                        variant="rounded"
                      >
                        {firstName.slice(0, 1)}
                        {lastName.slice(0, 1)}
                      </Avatar>
                      <Typography fontSize={18}>
                        {firstName} {lastName} (tel. {phoneNumber})
                      </Typography>
                    </Stack>
                  )}
                  error={Boolean(errors.readerId)}
                  helperText={errors.readerId ? t(errors.readerId) : ""}
                  disabled={isSubmitting}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography fontSize={18} mb={2}>
                  {t("lendBook:enterLendingPeriod")}
                </Typography>
                <Grid container spacing={1}>
                  <Grid item xs>
                    <DatePicker
                      id="lend-from-datepicker"
                      label={t("lendBook:from")}
                      value={dayjs(values.lendFrom)}
                      onChange={(value) => {
                        setFieldValue(
                          "lendFrom",
                          value ? value.toISOString() : "",
                        )
                      }}
                      textFieldProps={{
                        error: Boolean(errors.lendFrom),
                        helperText: errors.lendFrom ? t(errors.lendFrom) : "",
                        disabled: isSubmitting,
                      }}
                      disablePast
                    />
                  </Grid>
                  <Grid item xs="auto">
                    <Box
                      sx={{
                        marginTop: "26px",
                        width: 16,
                        height: "1px",
                        backgroundColor: (theme) => theme.palette.grey[400],
                      }}
                    />
                  </Grid>
                  <Grid item xs>
                    <DatePicker
                      id="lend-to-datepicker"
                      label={t("lendBook:to")}
                      value={dayjs(values.lendTo)}
                      onChange={(value) => {
                        setFieldValue(
                          "lendTo",
                          value ? value.toISOString() : "",
                        )
                      }}
                      textFieldProps={{
                        error: Boolean(errors.lendTo),
                        helperText: errors.lendTo ? t(errors.lendTo) : "",
                        disabled: isSubmitting,
                      }}
                      disablePast
                      minDate={dayjs(values.lendFrom).add(1, "day")}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} marginTop={2}>
                <Button
                  fullWidth
                  size="large"
                  color="secondary"
                  type="submit"
                  isSubmitting={isSubmitting}
                >
                  {t("lendBook:lendThisBook")}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Paper>
  )
}
export default LendBookForm
