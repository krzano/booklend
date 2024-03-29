import {
  AUTH_ME_ENDPOINT,
  AUTH_REMOVE_ACCOUNT_ENDPOINT,
  AUTH_REMOVE_PHOTO_ENDPOINT,
  AUTH_UPDATE_PASSWORD_ENDPOINT,
  AUTH_UPLOAD_PHOTO_ENDPOINT,
  UPLOADS_BASE_URL,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { ChangePasswordFormValues } from "@/libs/yup/schemas/changePassword"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
import { LogoutUserReason, logoutUser } from "../auth/authSlice"
import { AvatarFormValues } from "@/libs/yup/schemas/avatar"
import { RootState } from "@/app/store"
import { ChangeUserDataBody, GetUserDataResponse } from "@/types/api"
import generateUniqueFileName from "@/utils/generateUniqueFileName"
import { isCancel } from "axios"

export const getUserData = createAsyncThunk(
  "user/getUserData",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get<GetUserDataResponse>(
        AUTH_ME_ENDPOINT,
      )
      return data
    } catch (error) {
      if (isCancel(error)) {
        return thunkAPI.rejectWithValue(error.message)
      }
      thunkAPI.dispatch(logoutUser(LogoutUserReason.SERVER_ERROR))
      return thunkAPI.rejectWithValue(error)
    }
  },
)

export const changeUserData = createAsyncThunk(
  "user/changeUserData",
  async (
    { firstName, lastName, email, photo }: ChangeUserDataBody,
    thunkAPI,
  ) => {
    try {
      const requestData = {
        firstName,
        lastName,
        email,
        ...(photo && { photo }),
      }

      const { data } = await axiosProtectedInstance.put(
        AUTH_ME_ENDPOINT,
        requestData,
      )
      toast.success(data.message)
      return { firstName, lastName, email }
    } catch (error) {
      return thunkErrorHandler({ error, thunkAPI })
    }
  },
)

export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  async (
    { newPassword, confirmNewPassword }: ChangePasswordFormValues,
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.put(
        AUTH_UPDATE_PASSWORD_ENDPOINT,
        { password: newPassword, confirmPassword: confirmNewPassword },
      )
      toast.success(data.message)
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)

export const deleteUserAccount = createAsyncThunk(
  "user/deleteUserAccount",
  async (_, thunkAPI) => {
    try {
      await axiosProtectedInstance.delete(AUTH_REMOVE_ACCOUNT_ENDPOINT)
      thunkAPI.dispatch(logoutUser(LogoutUserReason.ACCOUNT_REMOVED))
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)

export const uploadUserPhoto = createAsyncThunk(
  "user/uploadUserPhoto",
  async ({ avatarImage }: AvatarFormValues, thunkAPI) => {
    const newFileName = generateUniqueFileName(avatarImage.name, "userPhoto")
    const formData = new FormData()
    formData.append("file", avatarImage, newFileName)
    try {
      const { data } = await axiosProtectedInstance.post(
        AUTH_UPLOAD_PHOTO_ENDPOINT,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )
      const state = thunkAPI.getState() as RootState
      const { firstName, lastName, email } = state.user.userData
      const photo = `${UPLOADS_BASE_URL}/${newFileName}`
      thunkAPI.dispatch(changeUserData({ firstName, lastName, email, photo }))
      toast.success(data.message)
      return photo
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)

export const removeUserPhoto = createAsyncThunk(
  "user/removeUserPhoto",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.delete(
        AUTH_REMOVE_PHOTO_ENDPOINT,
      )
      toast.success(data.message)
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
