import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
} from "@/utils/localStorage"
import axios, { AxiosInstance, isAxiosError } from "axios"
import i18next from "i18next"
import getNewAccessToken from "../../utils/getNewAccessToken"
import { BASE_URL } from "@/constants/api"

const axiosProtectedInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
})

axiosProtectedInstance.interceptors.request.use((config) => {
  config.headers["Accept-language"] = i18next.language
  const accessToken = getAccessTokenFromLocalStorage()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  } else {
    throw new axios.Cancel("Request canceled: access token not found...")
  }
})

axiosProtectedInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (isAxiosError(error) && error.config && error.response) {
      const prevConfig = error.config
      if (error.response.data.statusCode === 401) {
        try {
          const refreshToken = getRefreshTokenFromLocalStorage()
          if (refreshToken === null) return Promise.reject(error)
          const newAccessToken = await getNewAccessToken(refreshToken)
          prevConfig.headers.Authorization = `Bearer ${newAccessToken}`
        } catch (refreshError) {
          return Promise.reject(error)
        }
      }
      try {
        const response = await axios(prevConfig)
        return response
      } catch (newRequestError) {
        return Promise.reject(newRequestError)
      }
    } else {
      return Promise.reject(error)
    }
  },
)

export default axiosProtectedInstance
