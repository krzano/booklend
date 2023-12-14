import { store } from "@/app/store"
import { logoutUser } from "@/features/auth/authSlice"
import {
  getRefreshTokenFromLocalStorage,
  saveAccessTokenInLocalStorage,
} from "@/utils/localStorage"
import axiosAuthInstance from "./axiosAuthInstance"

const getNewAccessToken = async () => {
  try {
    const {
      data: { accessToken: newAccessToken },
    } = await axiosAuthInstance.post("/refreshToken", {
      refreshToken: getRefreshTokenFromLocalStorage(),
    })
    saveAccessTokenInLocalStorage(newAccessToken)
    return newAccessToken
  } catch (error) {
    store.dispatch(logoutUser({ reason: "sessionExpired" }))
    return Promise.reject(error)
  }
}

export default getNewAccessToken
