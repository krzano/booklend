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
import { useTranslation } from "react-i18next"

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

const sidebarWidth = 240

const DashboardLayoutWrapper = () => {
  const { t } = useTranslation(["dashboard", "common"])
  const sidebarListItems: SidebarListItemsType = [
    {
      id: 1,
      path: "/dashboard",
      text: t("sidebar.overview"),
      icon: <AssessmentRoundedIcon />,
      variant: "basic",
    },
    {
      id: 2,
      text: t("sidebar.readers"),
      icon: <PeopleAltRoundedIcon />,
      variant: "dropdown",
      dropdownItems: [
        {
          id: 21,
          path: "/dashboard/readers",
          text: t("sidebar.readersList"),
          icon: <RecentActorsIcon />,
        },
        {
          id: 22,
          path: "/dashboard/readers/add-reader",
          text: t("sidebar.addReader"),
          icon: <PersonAddRoundedIcon />,
        },
      ],
    },
    {
      id: 3,
      text: t("sidebar.library"),
      icon: <MenuBookRoundedIcon />,
      variant: "dropdown",
      dropdownItems: [
        {
          id: 31,
          path: "/dashboard/books",
          text: t("sidebar.booksList"),
          icon: <LibraryBooksRoundedIcon />,
        },
        {
          id: 32,
          path: "/dashboard/books/add-book",
          text: t("sidebar.addBook"),
          icon: <LibraryAddRoundedIcon />,
        },
      ],
    },
    {
      id: 4,
      path: "",
      text: t("sidebar.settings"),
      icon: <SettingsRoundedIcon />,
      variant: "basic",
    },
  ]

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
