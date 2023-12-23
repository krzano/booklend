import FormikFileInput from "@/components/FormikFileInput/FormikFileInput"
import PaperModal from "@/components/PaperModal/PaperModal"
import avatarSchema from "@/libs/yup/schemas/avatar"
import Grid from "@mui/material/Grid/Grid"
import { FormikProvider, useFormik } from "formik"
import { Dispatch, SetStateAction } from "react"
import Button from "@/components/Button/Button"
import PublishIcon from "@mui/icons-material/Publish"
import { useAppDispatch } from "@/app/hooks"
import { uploadUserPhoto } from "../../userThunk"
import AvatarUploadBox from "../AvatarUploadBox/AvatarUploadBox"
import { useTranslation } from "react-i18next"

interface ChangeAvatarModalProps {
  isModalOpen: boolean
  setIsModalOpen: Dispatch<SetStateAction<boolean>>
}

export interface ChangeAvatarInitialValues {
  avatarImage: null | File
}

const ChangeAvatarModal = ({
  isModalOpen,
  setIsModalOpen,
}: ChangeAvatarModalProps) => {
  const { t } = useTranslation(["settings"])
  const dispatch = useAppDispatch()

  const formikInitialValues: ChangeAvatarInitialValues = {
    avatarImage: null,
  }
  const formik = useFormik({
    initialValues: formikInitialValues,
    onSubmit: async ({ avatarImage }, actions) => {
      if (avatarImage) {
        await dispatch(uploadUserPhoto({ avatarImage }))
        setIsModalOpen(false)
        actions.resetForm()
      }
    },
    validationSchema: avatarSchema,
  })

  const { isSubmitting, dirty, values, handleSubmit } = formik
  const handleCloseModal = () => {
    if (!isSubmitting) {
      setIsModalOpen(false)
    }
  }
  return (
    <PaperModal
      title={t("settings:changeAvatar")}
      open={isModalOpen}
      onClose={handleCloseModal}
    >
      <FormikProvider value={formik}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, sm: 3 }} px={{ sm: 2 }}>
            <Grid item xs={12}>
              <FormikFileInput
                name="avatarImage"
                accept="image/*"
                disabled={isSubmitting}
              >
                <AvatarUploadBox avatarImage={values.avatarImage} />
              </FormikFileInput>
            </Grid>
            <Grid item xs={6}>
              <Button
                type="submit"
                isSubmitting={isSubmitting}
                disabled={!dirty || isSubmitting}
                fullWidth
                size="large"
                endIcon={<PublishIcon />}
              >
                {t("common:save")}
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                disabled={isSubmitting}
                color="primary"
                variant="outlined"
                fullWidth
                size="large"
                onClick={handleCloseModal}
              >
                {t("common:cancel")}
              </Button>
            </Grid>
          </Grid>
        </form>
      </FormikProvider>
    </PaperModal>
  )
}
export default ChangeAvatarModal
