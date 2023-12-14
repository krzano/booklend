import { Navigate, createBrowserRouter } from "react-router-dom"
import BasePageLayout from "@/layouts/BasePageLayout/BasePageLayout"
import { Typography } from "@mui/material"
import DashboardLayoutWrapper from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"
import Overview from "@/features/views/Overview"
import Login from "@/features/auth/views/Login"
import Register from "@/features/auth/views/Signup"
import ProtectedBasePageRoute from "./ProtectedBasePageRoute/ProtectedBasePageRoute"
import ProtectedDashboardRoute from "./ProtectedDashboardRoute/ProtectedDashboardRoute"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedBasePageRoute>
        <BasePageLayout />
      </ProtectedBasePageRoute>
    ),
    errorElement: (
      <div>
        <h2>There was en error...</h2>
      </div>
    ),
    children: [
      { index: true, element: <Navigate to="login" /> },
      { path: "login", element: <Login /> },
      {
        path: "signup",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedDashboardRoute>
        <DashboardLayoutWrapper />
      </ProtectedDashboardRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="overview" />,
      },
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "readers",
        element: (
          <Typography variant="h3" fontWeight="500">
            Readers page
          </Typography>
        ),
      },
      {
        path: "readers/add-reader",
        element: (
          <Typography variant="h3" fontWeight="500">
            Add reader page
          </Typography>
        ),
      },
      {
        path: "books",
        element: <Typography variant="h3">Books list page</Typography>,
      },
      {
        path: "books/add-book",
        element: <Typography variant="h3">Add book page</Typography>,
      },
    ],
  },
])

export default router
