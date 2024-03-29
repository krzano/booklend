import { Box, Container, useMediaQuery, useTheme } from "@mui/material"
import Sidebar from "./components/Sidebar/Sidebar"
import Topbar from "./components/Topbar/Topbar"
import { Outlet, useLocation } from "react-router-dom"
import styled, { css } from "styled-components"
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs"
import {
  SidebarListItemsType,
  TopbarAccountMenuItemsType,
} from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"
import { useAppSelector } from "@/app/hooks"
import Loader from "@/components/Loader/Loader"
import { Suspense, useEffect, useState } from "react"

export interface DashboardLayoutProps {
  sidebarListItems: SidebarListItemsType
  topbarAccountMenuItems: TopbarAccountMenuItemsType
}

const $sidebarWidth = 240

const DashboardLayout = ({
  sidebarListItems,
  topbarAccountMenuItems,
}: DashboardLayoutProps) => {
  const { pathname } = useLocation()
  const userStatus = useAppSelector((store) => store.user.status)
  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"))
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobileScreen)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }
  const $isDesktopSidebarOpen = !isMobileScreen && isSidebarOpen

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return (
    <>
      <Sidebar
        $sidebarWidth={$sidebarWidth}
        sidebarListItems={sidebarListItems}
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        isMobileScreen={isMobileScreen}
      />
      <StyledContent
        $isDesktopSidebarOpen={$isDesktopSidebarOpen}
        $sidebarWidth={$sidebarWidth}
      >
        <Topbar
          topbarAccountMenuItems={topbarAccountMenuItems}
          toggleSidebar={toggleSidebar}
          $isDesktopSidebarOpen={$isDesktopSidebarOpen}
        />
        <Box py={{ xs: 3, sm: 4 }}>
          <Container sx={{ pb: 4 }}>
            <Breadcrumbs />
          </Container>
          <Container component="main">
            <Suspense fallback={<Loader />}>
              {userStatus === "loading" ? <Loader /> : <Outlet />}
            </Suspense>
          </Container>
        </Box>
      </StyledContent>
    </>
  )
}

const StyledContent = styled.div<{
  $isDesktopSidebarOpen: boolean
  $sidebarWidth: number
}>`
  ${({ theme, $isDesktopSidebarOpen, $sidebarWidth }) => css`
    transition: ${$isDesktopSidebarOpen
      ? theme.transitions.create(["margin-left", "width"], {
          duration: theme.transitions.duration.enteringScreen,
          easing: theme.transitions.easing.easeOut,
        })
      : theme.transitions.create(["margin-left", "width"], {
          duration: theme.transitions.duration.leavingScreen,
          easing: theme.transitions.easing.sharp,
        })};

    ${$isDesktopSidebarOpen &&
    css`
      margin-left: ${$sidebarWidth}px;
      width: calc(100%-${$sidebarWidth}px);
    `}
  `};
`

export default DashboardLayout
