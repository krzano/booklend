import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout"

import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded"
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded"
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded"
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded"
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"
import { useMediaQuery } from "@mui/material"
import { useState } from "react"
import { useTheme } from "styled-components"
import { t } from "i18next"

export interface BasicSidebarListItemType {
  id: number
  variant: "basic"
  path: string
  text: string
  icon: React.ReactElement
}
export interface DropdownSidebarListItemType {
  id: number
  variant: "dropdown"
  text: string
  icon: React.ReactElement
  dropdownItems: Omit<BasicSidebarListItemType, "variant">[]
}

export type SidebarListItemsType = (
  | BasicSidebarListItemType
  | DropdownSidebarListItemType
)[]

const sidebarListItems: SidebarListItemsType = [
  {
    id: 1,
    path: "/dashboard",
    text: "Overview",
    icon: <AssessmentRoundedIcon />,
    variant: "basic",
  },
  {
    id: 2,
    text: "Readers",
    icon: <PeopleAltRoundedIcon />,
    variant: "dropdown",
    dropdownItems: [
      {
        id: 21,
        path: "/dashboard/readers",
        text: "Readers list",
        icon: <RecentActorsIcon />,
      },
      {
        id: 22,
        path: "/dashboard/readers/add-reader",
        text: "Add reader",
        icon: <PersonAddRoundedIcon />,
      },
    ],
  },
  {
    id: 3,
    text: "Library",
    icon: <MenuBookRoundedIcon />,
    variant: "dropdown",
    dropdownItems: [
      {
        id: 31,
        path: "/dashboard/books",
        text: "Books list",
        icon: <LibraryBooksRoundedIcon />,
      },
      {
        id: 32,
        path: "/dashboard/books/add-book",
        text: "Add book",
        icon: <LibraryAddRoundedIcon />,
      },
    ],
  },
  {
    id: 4,
    path: "",
    text: "Settings",
    icon: <SettingsRoundedIcon />,
    variant: "basic",
  },
]

const sidebarWidth = 240

const DashboardLayoutWrapper = () => {
  const theme = useTheme()
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("sm"))

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(!isMobileScreen)
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev)
  }

  const isDesktopSidebarOpen = !isMobileScreen && isSidebarOpen
  return (
    <DashboardLayout
      sidebarWidth={sidebarWidth}
      sidebarListItems={sidebarListItems}
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      isDesktopSidebarOpen={isDesktopSidebarOpen}
      isMobileScreen={isMobileScreen}
    />
  )
}
export default DashboardLayoutWrapper
