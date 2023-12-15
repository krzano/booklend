import { BASE_URL } from "@/constants/api"
import axios from "axios"
import i18next from "i18next"

const axiosAuthInstance = axios.create({
  baseURL: BASE_URL,
})

axiosAuthInstance.interceptors.request.use((req) => {
  req.headers["Accept-language"] = i18next.language
  return req
})

export default axiosAuthInstance
