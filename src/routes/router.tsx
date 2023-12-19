import { Navigate, createBrowserRouter } from "react-router-dom"
import BasePageLayout from "@/layouts/BasePageLayout/BasePageLayout"
import { Typography } from "@mui/material"
import DashboardLayoutWrapper from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"
import Overview from "@/features/views/Overview"
import Login from "@/features/auth/views/Login"
import Signup from "@/features/auth/views/Signup"
import RedirectFromLoginWrapper from "@/wrappers/RedirectFromLoginWrapper/RedirectFromLoginWrapper"
import ProtectedDashboardRoute from "./ProtectedRoute/ProtectedRoute"
import {
  ADD_BOOK_PATH,
  ADD_READER_PATH,
  BASE_PAGE_PATH,
  BOOKS_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
  OVERVIEW_PATH,
  READERS_PATH,
  SETTINGS_PATH,
  SIGNUP_PATH,
} from "@/constants/paths"
import Settings from "@/features/user/views/Settings"

const router = createBrowserRouter([
  {
    path: BASE_PAGE_PATH,
    element: (
      <RedirectFromLoginWrapper>
        <BasePageLayout />
      </RedirectFromLoginWrapper>
    ),
    errorElement: (
      <div>
        <h2>There was en error...</h2>
      </div>
    ),
    children: [
      { index: true, element: <Navigate to={LOGIN_PATH} /> },
      { path: LOGIN_PATH, element: <Login /> },
      {
        path: SIGNUP_PATH,
        element: <Signup />,
      },
    ],
  },
  {
    path: DASHBOARD_PATH,
    element: (
      <ProtectedDashboardRoute>
        <DashboardLayoutWrapper />
      </ProtectedDashboardRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to={OVERVIEW_PATH} />,
      },
      {
        path: OVERVIEW_PATH,
        element: <Overview />,
      },
      {
        path: SETTINGS_PATH,
        element: <Settings />,
      },
      {
        path: READERS_PATH,
        element: <Typography variant="h2">Readers page</Typography>,
      },
      {
        path: ADD_READER_PATH,
        element: <Typography variant="h2">Add reader page</Typography>,
      },
      {
        path: BOOKS_PATH,
        element: <Typography variant="h2">Books list page</Typography>,
      },
      {
        path: ADD_BOOK_PATH,
        element: <Typography variant="h2">Add book page</Typography>,
      },
    ],
  },
])

export default router
