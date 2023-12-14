import { getAccessTokenFromLocalStorage } from "@/utils/localStorage"
import axios, { AxiosInstance, isAxiosError } from "axios"
import i18next from "i18next"
import getNewAccessToken from "./getNewAccessToken"

const axiosProtectedInstance: AxiosInstance = axios.create({
  baseURL: "https://booklend-backend-nest.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
})

axiosProtectedInstance.interceptors.request.use(async (config) => {
  config.headers["Accept-language"] = i18next.language
  const accessToken = getAccessTokenFromLocalStorage()
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
})

axiosProtectedInstance.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    if (isAxiosError(error) && error.config && error.response) {
      const prevConfig = error.config
      if (error.response.status === 401) {
        try {
          const newAccessToken = await getNewAccessToken()
          prevConfig.headers.Authorization = `Bearer ${newAccessToken}`
        } catch (refreshError) {
          return Promise.reject(refreshError)
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
