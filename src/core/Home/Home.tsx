import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"

type Props = {}

const Home = (props: Props) => {
  const { t } = useTranslation(["test", "welcome"])
  return (
    <div>
      <Typography variant="h2">Home</Typography>
      <Typography>{t("translation:welcome")}</Typography>
      <Button
        sx={{ margin: 2 }}
        component={Link}
        to={"/dashboard"}
        variant="contained"
      >
        open dashboard
      </Button>
    </div>
  )
}

export default Home
