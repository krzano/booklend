import { useTranslation } from "react-i18next"
import dayjs from "dayjs"
import "dayjs/locale/pl"

const DayjsLocalizationProvider = () => {
  const { i18n } = useTranslation()
  if (i18n.language === "pl") {
    dayjs.locale("pl")
  } else {
    dayjs.locale("en")
  }
  return null
}
export default DayjsLocalizationProvider
