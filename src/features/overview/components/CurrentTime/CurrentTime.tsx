import { Typography } from "@mui/material"
import dayjs, { Dayjs } from "dayjs"
import { useEffect, useState } from "react"

const CurrentTime = () => {
  const [time, setTime] = useState<Dayjs>(dayjs())

  useEffect(() => {
    setTime(dayjs())
    const intervalId = setInterval(() => {
      setTime(dayjs())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Typography color={(theme) => theme.palette.grey[500]}>
      {time.format("dddd, LL LTS")}
    </Typography>
  )
}
export default CurrentTime
