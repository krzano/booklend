import LanguageSwitcher from "@/components/LanguageSwitcher/LanguageSwitcher"
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
import { useAppSelector } from "@/app/hooks"
import { useTranslation } from "react-i18next"
import styled, { css } from "styled-components"
import { Link as RouterLink } from "react-router-dom"
import { TopbarAccountMenuItemsType } from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"

export interface TopbarProps {
  toggleSidebar: () => void
  $isDesktopSidebarOpen: boolean
  topbarAccountMenuItems: TopbarAccountMenuItemsType
}

const Topbar = ({
  toggleSidebar,
  $isDesktopSidebarOpen,
  topbarAccountMenuItems,
}: TopbarProps) => {
  const { t } = useTranslation(["dashboard"])
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const {
    isUserDataLoading,
    userData: { firstName, photo },
  } = useAppSelector((store) => store.user)
  const userName = `${firstName}`

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ py: 1 }}>
        <IconButton size="large" onClick={toggleSidebar} color="inherit">
          {$isDesktopSidebarOpen ? (
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
          <Tooltip
            arrow={false}
            followCursor={true}
            title={t("dashboard:topbar.accountSettings")}
          >
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              variant="text"
            >
              <StyledAvatar src={photo || ""} />
            </Button>
          </Tooltip>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {topbarAccountMenuItems.map((item) => {
              if (item.component === "link") {
                const { id, icon, text, path } = item
                return (
                  <MenuItem
                    key={id}
                    component={RouterLink}
                    to={path}
                    onClick={handleClose}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </MenuItem>
                )
              }
              if (item.component === "button") {
                const { id, icon, text, onClick } = item
                return (
                  <MenuItem
                    key={id}
                    component="button"
                    onClick={() => {
                      handleClose()
                      onClick()
                    }}
                  >
                    <ListItemIcon>{icon}</ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </MenuItem>
                )
              }
              return null
            })}
            <Divider />
            <Box
              component={"li"}
              sx={{ display: "grid", placeContent: "center" }}
            >
              <LanguageSwitcher variant="text" />
            </Box>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  )
}

const StyledAvatar = styled(Avatar)`
  ${({ theme }) => css`
    background-color: ${theme.palette.grey[600]};
  `};
`

export default Topbar
