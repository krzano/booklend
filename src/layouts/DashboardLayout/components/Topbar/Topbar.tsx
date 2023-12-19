import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
import { Settings, Logout } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft"
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Skeleton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { LogoutUserReason, logoutUser } from "@/features/auth/authSlice"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import { Link as RouterLink } from "react-router-dom"
import { SETTINGS_PATH } from "@/constants/paths"

export interface TopbarProps {
  toggleSidebar: () => void
  isDesktopSidebarOpen: boolean
}

const Topbar = ({ toggleSidebar, isDesktopSidebarOpen }: TopbarProps) => {
  const { t } = useTranslation(["dashboard"])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useAppDispatch()
  const {
    isUserDataLoading,
    userData: { firstName, photo },
  } = useAppSelector((store) => store.user)
  const userName = `${firstName}`

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ py: 1 }}>
        <IconButton size="large" onClick={toggleSidebar} color="inherit">
          {isDesktopSidebarOpen ? (
            <KeyboardDoubleArrowLeftIcon fontSize="large" />
          ) : (
            <MenuIcon fontSize="large" />
          )}
        </IconButton>
        <Box flexGrow={1} display={"flex"} justifyContent={"flex-end"} gap={1}>
          <Typography
            fontFamily={(theme) => theme.otherFonts.serif}
            variant="h5"
          >
            {isUserDataLoading ? (
              <Skeleton sx={{ bgcolor: "grey.600" }} width={"6rem"} />
            ) : (
              userName
            )}
          </Typography>
        </Box>
        <div>
          <Tooltip arrow={false} followCursor={true} title={"Account settings"}>
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="text"
            >
              <StyledAvatar src={photo} />
            </Button>
          </Tooltip>
          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              component={RouterLink}
              to={SETTINGS_PATH}
              onClick={handleClose}
            >
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText>{t("dashboard:topbar.settings")}</ListItemText>
            </MenuItem>
            <MenuItem
              component="button"
              onClick={() => {
                handleClose()
                dispatch(logoutUser(LogoutUserReason.USER_LOGOUT))
              }}
            >
              <ListItemIcon>
                <Logout />
              </ListItemIcon>
              <ListItemText>{t("dashboard:topbar.logout")}</ListItemText>
            </MenuItem>
            <Divider />
            <Box
              component={"li"}
              sx={{ display: "grid", placeContent: "center" }}
            >
              <LanguageSwitcher variant="text" />
            </Box>
          </StyledMenu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const StyledAvatar = styled(Avatar)`
  ${({ theme }) => css`
    background-color: ${theme.palette.grey[600]};
    /* font-family: ${theme.otherFonts.serif}; */
    /* font-weight: bold; */
    /* font-size: 18px; */
  `};
  /* font-family: "inherit"; */
`

const StyledMenu = styled(Menu)`
  .MuiTypography-root {
    &::first-letter {
      text-transform: capitalize;
    }
  }
`

export default Topbar
