import axiosAuthInstance from "@/libs/axios/axiosAuthInstance"
import { LoginFormValues } from "@/libs/yup/schemas/loginSchema"
import { RegisterFormValues } from "@/libs/yup/schemas/registerSchema"
import {
  getAccessTokenFromLocalStorage,
  getRefreshTokenFromLocalStorage,
  removeTokensFromLocalStorage,
  saveAccessTokenInLocalStorage,
  saveRefreshTokenInLocalStorage,
} from "@/utils/localStorage"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import i18next from "i18next"
import { toast } from "react-toastify"

export interface AuthState {
  isAuthenticated: boolean
  isRegistrationCompleted: boolean
}

export interface ApiErrorResponse {
  errors: string[]
  message: string
  statusCode: number
}

const initialState: AuthState = {
  isAuthenticated: Boolean(
    getAccessTokenFromLocalStorage() && getRefreshTokenFromLocalStorage(),
  ),
  isRegistrationCompleted: false,
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginFormValues, thunkAPI) => {
    try {
      const { data } = await axiosAuthInstance.post("/login", {
        email,
        password,
      })
      saveAccessTokenInLocalStorage(data.accessToken)
      saveRefreshTokenInLocalStorage(data.refreshToken)
      toast.success(data.message)
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error) && error.response) {
        toast.error(error.response.data.errors[0])
        return thunkAPI.rejectWithValue(error.response.data.errors[0])
      } else {
        return thunkAPI.rejectWithValue(error)
      }
    }
  },
)

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    {
      firstName,
      lastName,
      email,
      password,
    }: Omit<RegisterFormValues, "confirmPassword">,
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosAuthInstance.post("/register", {
        firstName,
        lastName,
        email,
        password,
      })
      toast.success(data.message)
    } catch (error) {
      if (isAxiosError<ApiErrorResponse>(error) && error.response) {
        toast.error(error.response.data.errors[0])
        return thunkAPI.rejectWithValue(error.response.data.errors[0])
      } else {
        return thunkAPI.rejectWithValue(error)
      }
    }
  },
)

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
        payload: { reason },
      }: {
        payload: {
          reason: "sessionExpired" | "userLogout"
        }
      },
    ) => {
      state.isAuthenticated = false
      removeTokensFromLocalStorage()
      if (reason === "sessionExpired") {
        toast.error(i18next.t("common:sessionExpiredError"), {
          autoClose: 1000 * 60,
        })
      }
      if (reason === "userLogout") {
        toast.success(i18next.t("common:userLogoutSuccess"))
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
