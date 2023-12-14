import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { logoutUser } from "@/features/auth/authSlice"
import getNewAccessToken from "@/libs/axios/getNewAccessToken"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/utils/localStorage"
import { jwtDecode } from "jwt-decode"
import { ReactElement, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedDashboardRouteProps {
  children: ReactElement
}

const ProtectedDashboardRoute = ({
  children,
}: ProtectedDashboardRouteProps) => {
  const { isAuthenticated } = useAppSelector((store) => store.auth)
  const dispatch = useAppDispatch()
  const location = useLocation()
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()

  const checkAuth = () => {
    if (accessToken && refreshToken) {
      const currentDate = new Date().getTime()
      const decodedAccessToken = jwtDecode(accessToken)
      const decodedRefreshToken = jwtDecode(refreshToken)
      if (decodedRefreshToken.exp! < currentDate / 1000) {
        return dispatch(logoutUser({ reason: "sessionExpired" }))
      }
      if (decodedAccessToken.exp! < currentDate / 1000) {
        return getNewAccessToken()
      }
    } else {
      return dispatch(logoutUser({ reason: "sessionExpired" }))
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      checkAuth()
    }
  }, [location.pathname, accessToken, refreshToken, isAuthenticated])

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} />
  )
}
export default ProtectedDashboardRoute
