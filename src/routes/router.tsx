import { createBrowserRouter } from "react-router-dom"
import Home from "@/core/Home/Home"
import BasePageLayout from "@/layouts/BasePageLayout/BasePageLayout"

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
      { path: "/login", element: <h2>Login page</h2> },
      { path: "/register", element: <h2>Register page</h2> },
    ],
  },
])

export default router
