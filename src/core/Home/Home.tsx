import { useTranslation } from "react-i18next"

type Props = {}
const Home = (props: Props) => {
  const { t } = useTranslation(["test", "welcome"])
  return (
    <div>
      <h1>Home</h1>
      <h1>{t("test:test1")}</h1>
      <h1>{t("translation:welcome")}</h1>
    </div>
  )
}
export default Home
