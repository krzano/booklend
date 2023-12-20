import { MouseEvent, useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import Button from "@/components/Button/Button"
import Avatar from "@mui/material/Avatar/Avatar"
import styled, { css } from "styled-components"
import ChangeAvatarModal from "../ChangeAvatarModal/ChangeAvatarModal"
import { removeUserPhoto } from "../../userThunk"
import { Box, Divider, IconButton, Menu, Tooltip } from "@mui/material"
import EditRoundedIcon from "@mui/icons-material/EditRounded"
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded"
import PermMediaIcon from "@mui/icons-material/PermMedia"
import { useTranslation } from "react-i18next"
import firstLetterToUppercase from "@/utils/firstLetterToUppercase"

const ChangeAvatar = () => {
  const { t } = useTranslation(["settings"])
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const {
    userData: { photo },
  } = useAppSelector((store) => store.user)

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClickMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const handleDeleteAvatar = async () => {
    await dispatch(removeUserPhoto())
    handleCloseMenu()
  }
  return (
    <>
      <Box display="flex" justifyContent={{ xs: "center", sm: "start" }}>
        <Box position="relative" display="inline-block">
          <StyledAvatar $size="20rem" src={photo} />
          <Tooltip
            title={firstLetterToUppercase(t("common:edit"))}
            arrow
            followCursor
          >
            <StyledIconButton
              id="edit-avatar-button"
              aria-controls={open ? "edit-avatar-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClickMenu}
            >
              <EditRoundedIcon fontSize="large" color="primary" />
            </StyledIconButton>
          </Tooltip>
          <StyledMenu
            id="edit-avatar-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            MenuListProps={{
              "aria-labelledby": "edit-avatar-button",
              disablePadding: true,
            }}
          >
            <li onClick={handleCloseMenu}>
              <Button
                onClick={handleOpenModal}
                variant="text"
                size="large"
                fullWidth
                startIcon={<PermMediaIcon />}
              >
                {t("common:change")}
              </Button>
            </li>
            <Divider />
            <li>
              <Button
                disabled={!photo}
                variant="text"
                size="large"
                color="error"
                fullWidth
                startIcon={<DeleteForeverRoundedIcon />}
                onAsyncClick={handleDeleteAvatar}
              >
                {t("common:delete")}
              </Button>
            </li>
          </StyledMenu>
        </Box>
      </Box>
      <ChangeAvatarModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  )
}

export const StyledAvatar = styled(Avatar)<{ $size: string }>`
  ${({ theme, $size }) => css`
    margin: 0 auto;
    width: ${$size};
    height: ${$size};
    max-width: 100%;
    border: 1px solid ${theme.palette.primary.main};
  `}
`

const StyledIconButton = styled(IconButton)`
  ${({ theme }) => css`
    position: absolute;
    top: 70%;
    right: 0;
    border: 1px solid black;
    background-color: ${theme.palette.background.default};
    &:hover {
      background-color: ${theme.palette.grey[200]};
    }
  `}
`

const StyledMenu = styled(Menu)`
  .MuiButtonBase-root {
    gap: 1rem;
    padding: 1rem 2rem;
    border-radius: 0;
  }
`

export default ChangeAvatar
