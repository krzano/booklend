import axios from "axios"
import i18next from "i18next"

const url = import.meta.env.VITE_API_URL

const axiosAuthInstance = axios.create({
  baseURL: "https://booklend-backend-nest.onrender.com/auth",
  headers: {
    // "Content-Type": "application/json",
  },
})

axiosAuthInstance.interceptors.request.use((req) => {
  req.headers["Accept-language"] = i18next.language
  return req
})

export default axiosAuthInstance
