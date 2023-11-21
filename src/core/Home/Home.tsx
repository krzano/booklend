import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { useTranslation } from "react-i18next"

type Props = {}

const Home = (props: Props) => {
  const { t } = useTranslation(["test", "welcome"])
  return (
    <div>
      <h1>Home</h1>
      <h1>{t("translation:welcome")}</h1>
      <LanguageSwitcher />
    </div>
  )
}

export default Home
