import { createBrowserRouter } from "react-router-dom"
import Home from "@/core/Home/Home"

const router = createBrowserRouter([
  {
    path: "",
    element: <Home />,
    index: true,
  },
])

export default router
