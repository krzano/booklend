import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"
import { StyledAvatar } from "../ChangeAvatar/ChangeAvatar"
import { useAppSelector } from "@/app/hooks"
import { useTranslation } from "react-i18next"
interface AvatarUploadBoxProps {
  avatarImage: File | null
}

const AvatarUploadBox = ({ avatarImage }: AvatarUploadBoxProps) => {
  const { t } = useTranslation(["settings"])
  const {
    userData: { photo },
  } = useAppSelector((state) => state.user)

  return (
    <Box
      py={1}
      color={(theme) => theme.palette.grey[600]}
      textTransform="uppercase"
    >
      <Box display="grid" gridTemplateColumns="1fr" gap={0.5} pt={2} pb={1}>
        <StyledAvatar
          $size="20rem"
          src={avatarImage ? URL.createObjectURL(avatarImage) : photo}
        />
        <Box
          display="flex"
          justifyContent="center"
          alignContent={"flex-end"}
          gap={1}
          marginTop={1}
        >
          <Typography fontWeight={500}>{t("common:chooseFile")}</Typography>
        </Box>
        <Typography textTransform="lowercase" fontSize={14} fontWeight={400}>
          ({t("common:orDropFiles")})
        </Typography>
      </Box>
    </Box>
  )
}

export default AvatarUploadBox
