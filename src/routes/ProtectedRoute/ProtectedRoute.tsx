import { useAppDispatch, useAppSelector } from "@/app/hooks"
import { LOGIN_PATH } from "@/constants/paths"
import { LogoutUserReason, logoutUser } from "@/features/auth/authSlice"
import getNewAccessToken from "@/utils/getNewAccessToken"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/utils/localStorage"
import dayjs from "dayjs"
import { jwtDecode } from "jwt-decode"
import { ReactElement, useCallback, useEffect } from "react"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedDashboardRouteProps {
  children: ReactElement
}

const ProtectedDashboardRoute = ({
  children,
}: ProtectedDashboardRouteProps) => {
  const isAuthenticated = useAppSelector((store) => store.auth.isAuthenticated)
  const dispatch = useAppDispatch()
  const { pathname } = useLocation()
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()

  const checkAuth = useCallback(() => {
    if (accessToken && refreshToken) {
      const decodedAccessToken = jwtDecode(accessToken)
      const decodedRefreshToken = jwtDecode(refreshToken)

      if (decodedRefreshToken.exp && decodedRefreshToken.exp < dayjs().unix()) {
        return dispatch(logoutUser(LogoutUserReason.SESSION_EXPIRED))
      }
      if (decodedAccessToken.exp && decodedAccessToken.exp < dayjs().unix()) {
        return getNewAccessToken(refreshToken)
      }
    } else {
      return dispatch(logoutUser(LogoutUserReason.SESSION_EXPIRED))
    }
  }, [accessToken, refreshToken, dispatch])

  useEffect(() => {
    if (isAuthenticated) {
      checkAuth()
    }
  }, [pathname, accessToken, refreshToken, isAuthenticated, checkAuth])

  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={LOGIN_PATH} state={{ from: pathname }} />
  )
}
export default ProtectedDashboardRoute
