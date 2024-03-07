import { useAppSelector } from "@/app/hooks"
import { DASHBOARD_PATH } from "@/constants/paths"
import { ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface RedirectFromLoginWrapperProps {
  children: ReactElement
}

const RedirectFromLoginWrapper = ({
  children,
}: RedirectFromLoginWrapperProps) => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated)
  const location = useLocation()
  const from = location?.state?.from

  return isAuthenticated ? (
    <Navigate to={from ? from : DASHBOARD_PATH} />
  ) : (
    children
  )
}
export default RedirectFromLoginWrapper
