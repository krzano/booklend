import Box from "@mui/material/Box/Box"
import Typography from "@mui/material/Typography/Typography"
import styled, { css } from "styled-components"
import { StyledAvatar } from "../ChangeAvatar/ChangeAvatar"
import Button from "@/components/Button/Button"
import { useAppSelector } from "@/app/hooks"
import { useTranslation } from "react-i18next"
interface AvatarChooseFileButtonProps {
  isSubmitting: boolean
  avatarImage: File | null
}

const AvatarChooseFileButton = ({
  isSubmitting,
  avatarImage,
}: AvatarChooseFileButtonProps) => {
  const { t } = useTranslation(["settings"])
  const {
    userData: { photo },
  } = useAppSelector((state) => state.user)

  return (
    <StyledAvatarChooseFileButton
      tabIndex={-1}
      disableRipple
      disableTouchRipple
      onFocus={(e) => e.preventDefault()}
      onFocusVisible={(e) => e.preventDefault()}
      fullWidth
      variant="outlined"
      component="span"
      disabled={isSubmitting}
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
    </StyledAvatarChooseFileButton>
  )
}

const StyledAvatarChooseFileButton = styled(Button)`
  ${({ theme }) => css`
    color: ${theme.palette.grey[500]};
    background-color: ${theme.palette.background.default};
    border: 1px solid ${theme.palette.grey[400]};
    &:hover {
      color: ${theme.palette.grey[600]};
      background-color: ${theme.palette.background.default};
      border-color: ${theme.palette.grey[600]};
    }
  `}
`

export default AvatarChooseFileButton
