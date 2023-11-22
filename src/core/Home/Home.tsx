import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"

type Props = {}

const Home = (props: Props) => {
  const { t } = useTranslation(["test", "welcome"])
  return (
    <div>
      <h1>Home</h1>
      <Typography>{t("translation:welcome")}</Typography>
    </div>
  )
}

export default Home
