import { useAppDispatch } from "@/app/hooks"
import Button from "@/components/Button/Button"
import PaperModal from "@/components/PaperModal/PaperModal"
import { GetSingleLendBookResponse } from "@/types/api"
import { Typography } from "@mui/material"
import Box from "@mui/material/Box/Box"
import Slider from "@mui/material/Slider/Slider"
import Stack from "@mui/material/Stack/Stack"
import { DateCalendar } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { updateLendBook } from "../../lendBookThunk"

interface ExtendLendingPeriodProps {
  lendBookId: GetSingleLendBookResponse["_id"]
  bookId: GetSingleLendBookResponse["bookId"]
  readerId: GetSingleLendBookResponse["readerId"]
  lendFrom: GetSingleLendBookResponse["lendFrom"]
  lendTo: GetSingleLendBookResponse["lendTo"]
}

const ExtendLendingPeriod = ({
  lendBookId,
  bookId,
  readerId,
  lendFrom,
  lendTo,
}: ExtendLendingPeriodProps) => {
  const { t } = useTranslation(["lendBook"])
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [days, setDays] = useState<number>(0)

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setDays(0)
  }

  return (
    <>
      <Button
        color="secondary"
        fullWidth
        size="large"
        variant="outlined"
        onClick={() => setIsModalOpen(true)}
      >
        {t("lendBook:extendLendingPeriod")}
      </Button>
      <PaperModal open={isModalOpen} onClose={handleCloseModal}>
        <Typography
          component={"h2"}
          px={{ xs: 4, sm: 8 }}
          fontSize={{ xs: 16, sm: 18 }}
          mb={2}
        >
          {t("lendBook:useSliderToSelectNumberOfDays")}
        </Typography>
        <Box width={1} display={"flex"} flexWrap={"wrap"}>
          <DateCalendar
            sx={{ pointerEvents: "none" }}
            views={["day"]}
            disableHighlightToday
            minDate={dayjs(lendTo)}
            maxDate={dayjs(lendTo).add(7, "day")}
            readOnly
            value={dayjs(lendTo).add(days, "day")}
          />
          <Stack width={1} px={{ xs: 4, sm: 8 }} spacing={4}>
            <Slider
              aria-label="Small steps"
              value={days}
              onChange={(_, newValue) => {
                if (typeof newValue === "number") {
                  setDays(newValue)
                }
              }}
              getAriaValueText={(val, index) => `${index} dzień`}
              step={1}
              marks
              min={0}
              max={7}
              valueLabelFormat={(value) =>
                "+" + t("lendBook:days", { count: value })
              }
              valueLabelDisplay="on"
            />
            <Stack gap={2} direction={"row"} flexWrap={"wrap"}>
              <Button
                color="secondary"
                variant="outlined"
                fullWidth
                onAsyncClick={async () => {
                  await dispatch(
                    updateLendBook({
                      lendBookId,
                      newLendBookData: {
                        bookId,
                        readerId,
                        lendFrom,
                        lendTo: dayjs(lendTo).add(days, "day").toISOString(),
                        lendStatus: "borrowed",
                      },
                    }),
                  )
                }}
                disabled={days === 0}
              >
                {days > 0
                  ? `${t("lendBook:extendBy")} ${t("lendBook:days", {
                      count: days,
                    })}`
                  : t("lendBook:extend")}
              </Button>
              <Button variant="outlined" fullWidth onClick={handleCloseModal}>
                {t("common:cancel")}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </PaperModal>
    </>
  )
}
export default ExtendLendingPeriod
