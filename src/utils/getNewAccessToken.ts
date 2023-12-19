import { store } from "@/app/store"
import { LogoutUserReason, logoutUser } from "@/features/auth/authSlice"
import { saveAccessTokenInLocalStorage } from "@/utils/localStorage"
import axiosAuthInstance from "../libs/axios/axiosAuthInstance"
import { AUTH_REFRESH_TOKEN_ENDPOINT } from "@/constants/api"

const getNewAccessToken = async (refreshToken: string) => {
  try {
    const {
      data: { accessToken: newAccessToken },
    } = await axiosAuthInstance.post(AUTH_REFRESH_TOKEN_ENDPOINT, {
      refreshToken,
    })
    saveAccessTokenInLocalStorage(newAccessToken)
    return newAccessToken
  } catch (refreshError) {
    store.dispatch(logoutUser(LogoutUserReason.SESSION_EXPIRED))
    return Promise.reject(refreshError)
  }
}

export default getNewAccessToken
