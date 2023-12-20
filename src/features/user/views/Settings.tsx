import ChangePasswordForm from "../components/ChangePasswordForm/ChangePasswordForm"
import ChangeInfoForm from "../components/ChangeInfoForm/ChangeInfoForm"
import Section from "@/components/Section/Section"
import DeleteAccount from "../components/DeleteAccount/DeleteAccount"
import ChangeAvatar from "../components/ChangeAvatar/ChangeAvatar"
import { Grid } from "@mui/material"
import { useTranslation } from "react-i18next"
import PageTitle from "@/components/PageTitle/PageTitle"

const Settings = () => {
  const { t } = useTranslation(["settings"])
  return (
    <>
      <PageTitle>{t("settings:accountSettings")}</PageTitle>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Section>
            <ChangeAvatar />
          </Section>
        </Grid>
        <Grid item xs={12} md={8}>
          <Section title={t("settings:personalInfo")}>
            <ChangeInfoForm />
          </Section>
        </Grid>
        <Grid item xs={12} md={8}>
          <Section title={t("settings:changePassword")}>
            <ChangePasswordForm />
          </Section>
        </Grid>
        <Grid item xs={12}>
          <Section>
            <DeleteAccount />
          </Section>
        </Grid>
      </Grid>
    </>
  )
}

export default Settings
