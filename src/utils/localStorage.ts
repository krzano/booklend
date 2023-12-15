const ACCESS_TOKEN_KEY = "booklendAccessToken"
const REFRESH_TOKEN_KEY = "booklendRefreshToken"

export const saveAccessTokenInLocalStorage = (accessToken: string) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
}
export const saveRefreshTokenInLocalStorage = (refreshToken: string) => {
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

export const getAccessTokenFromLocalStorage = () => {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}
export const getRefreshTokenFromLocalStorage = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY)
}

export const removeTokensFromLocalStorage = () => {
  localStorage.removeItem(REFRESH_TOKEN_KEY)
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}
