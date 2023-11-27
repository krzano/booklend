import { createBrowserRouter } from "react-router-dom"
import Home from "@/core/Home/Home"
import BasePageLayout from "@/layouts/BasePageLayout/BasePageLayout"
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout"
import { Typography } from "@mui/material"
import DashboardLayoutWrapper from "@/wrappers/DashboarLayoutWrapper/DashboardLayoutWrapper"

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasePageLayout />,
    errorElement: (
      <div>
        <h2>There was en error...</h2>
      </div>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Typography>Login page</Typography> },
      {
        path: "/register",
        element: (
          <Typography variant="h2" fontWeight="500">
            Register page
          </Typography>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayoutWrapper />,
    children: [
      {
        index: true,
        element: (
          <Typography variant="h3" fontWeight="500">
            Dashboard start page
          </Typography>
        ),
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
