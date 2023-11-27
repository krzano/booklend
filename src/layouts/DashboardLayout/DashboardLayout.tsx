import { Box } from "@mui/material"
import Sidebar from "./components/Sidebar/Sidebar"
import Topbar from "./components/Topbar/Topbar"
import { Outlet } from "react-router-dom"
import styled, { css } from "styled-components"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import { SidebarListItemsType } from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"

export interface DashboardLayoutProps {
  sidebarWidth: number
  sidebarListItems: SidebarListItemsType
  isSidebarOpen: boolean
  toggleSidebar: () => void
  isDesktopSidebarOpen: boolean
  isMobileScreen: boolean
}

const DashboardLayout = ({
  sidebarWidth,
  sidebarListItems,
  isSidebarOpen,
  toggleSidebar,
  isDesktopSidebarOpen,
  isMobileScreen,
}: DashboardLayoutProps) => {
  return (
    <>
      <Sidebar
        sidebarWidth={sidebarWidth}
        sidebarListItems={sidebarListItems}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobileScreen={isMobileScreen}
      />
      <StyledContent
        isDesktopSidebarOpen={isDesktopSidebarOpen}
        sidebarWidth={sidebarWidth}
      >
        <Topbar
          toggleSidebar={toggleSidebar}
          isDesktopSidebarOpen={isDesktopSidebarOpen}
        />
        <Box px={{ xs: 2, sm: 4 }} py={{ xs: 3, sm: 4 }}>
          <Box pb={4}>
            <Breadcrumbs />
          </Box>
          <main>
            <Outlet />
          </main>
        </Box>
      </StyledContent>
    </>
  )
}

const StyledContent = styled.div<{
  isDesktopSidebarOpen: boolean
  sidebarWidth: number
}>`
  ${({ theme, isDesktopSidebarOpen, sidebarWidth }) => css`
    transition: ${isDesktopSidebarOpen
      ? theme.transitions.create(["margin-left", "width"], {
          duration: theme.transitions.duration.enteringScreen,
          easing: theme.transitions.easing.easeOut,
        })
      : theme.transitions.create(["margin-left", "width"], {
          duration: theme.transitions.duration.leavingScreen,
          easing: theme.transitions.easing.sharp,
        })};

    ${isDesktopSidebarOpen &&
    css`
      margin-left: ${sidebarWidth}px;
      width: calc(100%-${sidebarWidth}px);
    `}
  `};
`

export default DashboardLayout
