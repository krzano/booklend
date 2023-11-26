import { useEffect, useState } from "react"
import { NavLink, useLocation } from "react-router-dom"
import {
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material"
import Drawer from "@mui/material/Drawer"
import styled, { css } from "styled-components"
import logo from "@/assets/images/logo.svg"
import { ExpandLess, ExpandMore } from "@mui/icons-material"
import { SidebarListItemsType } from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"

export interface SidebarProps {
  sidebarWidth: number
  sidebarListItems: SidebarListItemsType
  isMobileScreen: boolean
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({
  sidebarWidth,
  sidebarListItems,
  isSidebarOpen,
  toggleSidebar,
  isMobileScreen,
}: SidebarProps) => {
  const [openItems, setOpenItems] = useState<number[]>([-1])
  const handleToggleItem = (id: number) => {
    if (openItems.includes(id)) {
      return setOpenItems((prev) => prev.filter((item) => item !== id))
    }
    return setOpenItems((prev) => [...prev, id])
  }
  const location = useLocation()

  const checkForOpenDropdown = () => {
    const openDropdownItem = sidebarListItems.find(
      (item) =>
        item.variant === "dropdown" &&
        item.dropdownItems.some(
          (nestedItem) => nestedItem.path === location.pathname,
        ),
    )
    if (openDropdownItem) {
      return setOpenItems((prev) => [...prev, openDropdownItem.id])
    }
  }

  useEffect(() => {
    checkForOpenDropdown()
  }, [])

  return (
    <StyledSidebar
      anchor="left"
      open={isSidebarOpen}
      onClose={toggleSidebar}
      variant={isMobileScreen ? "temporary" : "persistent"}
      sidebarWidth={sidebarWidth}
    >
      <StyledSidebarHeader>
        <img src={logo} alt="Booklend logo" />
      </StyledSidebarHeader>
      <List component="nav">
        {sidebarListItems.map((sidebarItem) => {
          if (sidebarItem.variant === "basic") {
            return (
              <ListItemButton
                key={sidebarItem.id}
                component={NavLink}
                to={sidebarItem.path}
                selected={sidebarItem.path === location.pathname}
                onClick={() => isMobileScreen && toggleSidebar()}
              >
                <ListItemIcon>{sidebarItem.icon}</ListItemIcon>
                <ListItemText primary={sidebarItem.text} />
              </ListItemButton>
            )
          }
          if (sidebarItem.variant === "dropdown") {
            const isOpen = openItems.includes(sidebarItem.id)
            return (
              <>
                <ListItemButton
                  key={sidebarItem.id}
                  onClick={() => handleToggleItem(sidebarItem.id)}
                >
                  <ListItemIcon>{sidebarItem.icon}</ListItemIcon>
                  <ListItemText primary={sidebarItem.text} />
                  {isOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {sidebarItem.dropdownItems.map((dropdownItem) => (
                      <ListItemButton
                        key={dropdownItem.id}
                        sx={{ pl: 4 }}
                        component={NavLink}
                        to={dropdownItem.path}
                        selected={dropdownItem.path === location.pathname}
                        onClick={() => isMobileScreen && toggleSidebar()}
                      >
                        <ListItemIcon>{dropdownItem.icon}</ListItemIcon>
                        <ListItemText primary={dropdownItem.text} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            )
          }
        })}
      </List>
    </StyledSidebar>
  )
}

const StyledSidebar = styled(Drawer)<{ sidebarWidth: number }>`
  ${({ sidebarWidth }) => css`
    width: ${sidebarWidth}px;
    & .MuiDrawer-paper {
      width: ${sidebarWidth}px;
    }
  `}
  .MuiListItemButton-root {
    /* ::first-letter {
      text-transform: uppercase;
    } */
    text-transform: capitalize;
  }
`

const StyledSidebarHeader = styled.header`
  display: grid;
  place-content: center;
  padding: ${({ theme }) => theme.spacing(4)};
`

export default Sidebar
