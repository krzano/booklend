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
  EDIT_BOOK_PATH,
  LOGIN_PATH,
  OVERVIEW_PATH,
  READERS_PATH,
  SETTINGS_PATH,
  SIGNUP_PATH,
} from "@/constants/paths"
import Settings from "@/features/user/views/Settings"
import AddBook from "@/features/books/views/AddBook"
import BooksList from "@/features/books/views/BooksList"
import EditBook from "@/features/books/views/EditBook"
import SingleBook from "@/features/books/views/SingleBook"
import AddReader from "@/features/readers/views/AddReader"
import ReadersList from "@/features/readers/views/ReadersList"

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
        element: <ReadersList />,
      },
      {
        path: ADD_READER_PATH,
        element: <AddReader />,
      },
      {
        path: BOOKS_PATH,
        element: <BooksList />,
      },
      {
        path: ADD_BOOK_PATH,
        element: <AddBook />,
      },
      {
        path: EDIT_BOOK_PATH,
        element: <Navigate to={BOOKS_PATH} />,
      },
      {
        path: `${EDIT_BOOK_PATH}/:bookId`,
        element: <EditBook />,
      },
      {
        path: `${BOOKS_PATH}/:bookId`,
        element: <SingleBook />,
      },
    ],
  },
])

export default router
