import { useAppSelector } from "@/app/hooks"
import PageTitle from "@/components/PageTitle/PageTitle"
import { useTranslation } from "react-i18next"

const Overview = () => {
  const { t } = useTranslation()
  const { userData } = useAppSelector((store) => store.user)
  return (
    <>
      <PageTitle>
        {t("common:welcome")} {userData.firstName}
      </PageTitle>
    </>
  )
}

export default Overview
