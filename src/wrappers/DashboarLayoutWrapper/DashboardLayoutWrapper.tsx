import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout"
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded"
import PersonAddRoundedIcon from "@mui/icons-material/PersonAddRounded"
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded"
import RecentActorsIcon from "@mui/icons-material/RecentActors"
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded"
import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded"
import LibraryAddRoundedIcon from "@mui/icons-material/LibraryAddRounded"
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded"
import SettingsIcon from "@mui/icons-material/Settings"
import LogoutIcon from "@mui/icons-material/Logout"
import { ReactElement, useEffect } from "react"
import { useTranslation } from "react-i18next"
import {
  ADD_BOOK_PATH,
  ADD_READER_PATH,
  BOOKS_PATH,
  OVERVIEW_PATH,
  READERS_PATH,
  SETTINGS_PATH,
} from "@/constants/paths"
import { useAppDispatch } from "@/app/hooks"
import { getUserData } from "@/features/user/userThunk"
import { LogoutUserReason, logoutUser } from "@/features/auth/authSlice"

interface TopbarAccountMenuItemLink {
  id: number
  component: "link"
  path: string
  text: string
  icon: ReactElement
}
interface TopbarAccountMenuItemButton {
  id: number
  component: "button"
  onClick: () => void
  text: string
  icon: ReactElement
}
export type TopbarAccountMenuItemsType = (
  | TopbarAccountMenuItemLink
  | TopbarAccountMenuItemButton
)[]

interface SidebarBasicListItemType {
  id: number
  variant: "basic"
  path: string
  text: string
  icon: ReactElement
}
export interface SidebarDropdownListItemType {
  id: number
  variant: "dropdown"
  text: string
  icon: ReactElement
  dropdownItems: Omit<SidebarBasicListItemType, "variant">[]
}
export type SidebarListItemsType = (
  | SidebarBasicListItemType
  | SidebarDropdownListItemType
)[]

const DashboardLayoutWrapper = () => {
  const { t } = useTranslation(["dashboard"])
  const dispatch = useAppDispatch()

  const topbarAccountMenuItems: TopbarAccountMenuItemsType = [
    {
      id: 1,
      component: "link",
      path: SETTINGS_PATH,
      text: t("topbar.settings"),
      icon: <SettingsIcon />,
    },
    {
      id: 2,
      component: "button",
      onClick: () => {
        dispatch(logoutUser(LogoutUserReason.USER_LOGOUT))
      },
      text: t("topbar.logout"),
      icon: <LogoutIcon />,
    },
  ]

  const sidebarListItems: SidebarListItemsType = [
    {
      id: 1,
      path: OVERVIEW_PATH,
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
          path: READERS_PATH,
          text: t("sidebar.readersList"),
          icon: <RecentActorsIcon />,
        },
        {
          id: 22,
          path: ADD_READER_PATH,
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
          path: BOOKS_PATH,
          text: t("sidebar.booksList"),
          icon: <LibraryBooksRoundedIcon />,
        },
        {
          id: 32,
          path: ADD_BOOK_PATH,
          text: t("sidebar.addBook"),
          icon: <LibraryAddRoundedIcon />,
        },
      ],
    },
    {
      id: 4,
      path: SETTINGS_PATH,
      text: t("sidebar.settings"),
      icon: <SettingsRoundedIcon />,
      variant: "basic",
    },
  ]

  useEffect(() => {
    dispatch(getUserData())
  }, [dispatch])

  return (
    <DashboardLayout
      topbarAccountMenuItems={topbarAccountMenuItems}
      sidebarListItems={sidebarListItems}
    />
  )
}
export default DashboardLayoutWrapper
