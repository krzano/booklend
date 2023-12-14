import { useAppDispatch } from "@/app/hooks"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/utils/localStorage"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const CheckAuth = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const accessToken = getAccessTokenFromLocalStorage()
  const refreshToken = getRefreshTokenFromLocalStorage()
  const checkAuth = () => {}
  if (accessToken && refreshToken) {
    const decodedAccessToken = jwtDecode(accessToken)
    const decodedRefreshToken = jwtDecode(refreshToken)
    console.log(decodedAccessToken)
    console.log(decodedRefreshToken)
  }
  useEffect(() => {}, [location.pathname])

  return <></>
}
export default CheckAuth
