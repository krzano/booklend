import { store } from "@/app/store"
import { LogoutUserReason, logoutUser } from "@/features/auth/authSlice"
import {
  getRefreshTokenFromLocalStorage,
  saveAccessTokenInLocalStorage,
} from "@/utils/localStorage"
import axiosAuthInstance from "./axiosAuthInstance"
import { AUTH_REFRESH_TOKEN_ENDPOINT } from "@/constants/api"

const getNewAccessToken = async () => {
  try {
    const {
      data: { accessToken: newAccessToken },
    } = await axiosAuthInstance.post(AUTH_REFRESH_TOKEN_ENDPOINT, {
      refreshToken: getRefreshTokenFromLocalStorage(),
    })
    saveAccessTokenInLocalStorage(newAccessToken)
    return newAccessToken
  } catch (error) {
    store.dispatch(logoutUser(LogoutUserReason.SESSION_EXPIRED))
    return Promise.reject(error)
  }
}

export default getNewAccessToken
