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
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material"
import { useState } from "react"
import { useAppDispatch } from "@/app/hooks"
import { logoutUser } from "@/features/auth/authSlice"
import { useTranslation } from "react-i18next"
import styled from "styled-components"

export interface TopbarProps {
  toggleSidebar: () => void
  isDesktopSidebarOpen: boolean
}

const Topbar = ({ toggleSidebar, isDesktopSidebarOpen }: TopbarProps) => {
  const { t } = useTranslation(["dashboard", "common"])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const dispatch = useAppDispatch()

  const fakeName = "Nicola Tesla"
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
            {fakeName}
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
              <Avatar alt={fakeName} src="brokenSrc" />
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
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText>{t("dashboard:topbar.settings")}</ListItemText>
            </MenuItem>
            <MenuItem
              // component="button"
              onClick={() => {
                handleClose()
                dispatch(logoutUser({ reason: "userLogout" }))
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

const StyledMenu = styled(Menu)`
  .MuiTypography-root {
    &::first-letter {
      text-transform: capitalize;
    }
  }
`

export default Topbar
