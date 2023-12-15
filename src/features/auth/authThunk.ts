import { AUTH_LOGIN__ENDPOINT, AUTH_REGISTER_ENDPOINT } from "@/constants/api"
import axiosAuthInstance from "@/libs/axios/axiosAuthInstance"
import { LoginFormValues } from "@/libs/yup/schemas/login"
import { RegisterFormValues } from "@/libs/yup/schemas/register"
import { ApiErrorResponse } from "@/types/api"
import {
  saveAccessTokenInLocalStorage,
  saveRefreshTokenInLocalStorage,
} from "@/utils/localStorage"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }: LoginFormValues, thunkAPI) => {
    try {
      const { data } = await axiosAuthInstance.post(AUTH_LOGIN__ENDPOINT, {
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
      const { data } = await axiosAuthInstance.post(AUTH_REGISTER_ENDPOINT, {
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
