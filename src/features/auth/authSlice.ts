import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
} from "@/utils/localStorage"
import { createSlice } from "@reduxjs/toolkit"
import i18next from "i18next"
import { toast } from "react-toastify"
import { loginUser, registerUser } from "./authThunk"

export enum LogoutUserReason {
  SESSION_EXPIRED,
  USER_LOGOUT,
  ACCOUNT_REMOVED,
  SERVER_ERROR,
}

export interface AuthState {
  isAuthenticated: boolean
  isRegistrationCompleted: boolean
}

const sessionExpiredAutoClose = 1000 * 10

const initialState: AuthState = {
  isAuthenticated: Boolean(
    getAccessTokenFromLocalStorage() && getRefreshTokenFromLocalStorage(),
  ),
  isRegistrationCompleted: false,
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setIsAuthenticated: (state, { payload }: { payload: boolean }) => {
      state.isAuthenticated = payload
    },
    setIsRegistrationCompleted: (state, { payload }: { payload: boolean }) => {
      state.isRegistrationCompleted = payload
    },
    logoutUser: (
      state,
      {
        payload,
      }: {
        payload: LogoutUserReason
      },
    ) => {
      state.isAuthenticated = false
      removeTokensFromLocalStorage()
      if (payload === LogoutUserReason.SESSION_EXPIRED) {
        toast.error(i18next.t("common:sessionExpiredError"), {
          autoClose: sessionExpiredAutoClose,
          closeButton: true,
        })
      }
      if (payload === LogoutUserReason.USER_LOGOUT) {
        toast.success(i18next.t("common:userLogoutSuccess"))
      }
      if (payload === LogoutUserReason.ACCOUNT_REMOVED) {
        toast.success(i18next.t("common:accountRemoveSuccess"))
      }
      if (payload === LogoutUserReason.SERVER_ERROR) {
        toast.error(i18next.t("common:serverErrorLogout"), {
          autoClose: sessionExpiredAutoClose,
          closeButton: true,
        })
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthenticated = false
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isAuthenticated = true
      })
      .addCase(registerUser.pending, (state) => {
        state.isRegistrationCompleted = false
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isRegistrationCompleted = true
      })
  },
})

export const { setIsAuthenticated, setIsRegistrationCompleted, logoutUser } =
  authSlice.actions

export default authSlice.reducer
