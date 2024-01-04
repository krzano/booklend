import PageTitle from "@/components/PageTitle/PageTitle"
import { useTranslation } from "react-i18next"

const ReadersList = () => {
  const { t } = useTranslation(["readers"])
  return (
    <>
      <PageTitle>{t("readers:readersList")}</PageTitle>
    </>
  )
}
export default ReadersList
