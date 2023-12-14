import { useAppSelector } from "@/app/hooks"
import { ReactElement } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedBasePageRouteProps {
  children: ReactElement
}

const ProtectedBasePageRoute = ({ children }: ProtectedBasePageRouteProps) => {
  const { isAuthenticated } = useAppSelector((store) => store.auth)
  const location = useLocation()
  const from = location?.state?.from

  return isAuthenticated ? (
    <Navigate to={from ? from : "/dashboard"} />
  ) : (
    children
  )
}
export default ProtectedBasePageRoute
