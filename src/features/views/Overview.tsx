import Button from "@/components/Button/Button"
import { BOOKS_PATH } from "@/constants/paths"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import Typography from "@mui/material/Typography/Typography"
import { useTranslation } from "react-i18next"

const Overview = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h4" component="h2" textTransform="capitalize">
        {t("common:welcome")} Nicola Tesla
      </Typography>
      <Button
        variant="outlined"
        onAsyncClick={async () => {
          try {
            const response = await axiosProtectedInstance.get(BOOKS_PATH)
            console.log("Get books response:", response)
          } catch (error) {
            console.error("Get books error:", error)
          }
        }}
      >
        get books
      </Button>
    </>
  )
}
export default Overview
