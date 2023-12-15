import { useAppSelector } from "@/app/hooks"
import { DASHBOARD_PATH } from "@/constants/paths"
import { ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface RedirectUserLoginRouteProps {
  children: ReactElement
}

const RedirectUserLoginRoute = ({ children }: RedirectUserLoginRouteProps) => {
  const { isAuthenticated } = useAppSelector((store) => store.auth)
  const location = useLocation()
  const from = location?.state?.from

  return isAuthenticated ? (
    <Navigate to={from ? from : DASHBOARD_PATH} />
  ) : (
    children
  )
}
export default RedirectUserLoginRoute
