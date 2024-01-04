import {
  READERS_ENDPOINT,
  READERS_UPLOAD_PHOTO_ENDPOINT,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { AddReaderFormValues } from "@/libs/yup/schemas/addReader"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const addReader = createAsyncThunk(
  "readers/addReader",
  async (
    {
      firstName,
      lastName,
      phoneNumber,
      address,
      readerImage,
    }: AddReaderFormValues,
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.post(READERS_ENDPOINT, {
        firstName,
        lastName,
        phoneNumber,
        address,
      })
      if (readerImage) {
        const formData = new FormData()
        formData.append("file", readerImage)
        const photoResponse = await axiosProtectedInstance.post(
          `${READERS_UPLOAD_PHOTO_ENDPOINT}/${data.readerId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        toast.success(photoResponse.data.message)
      }
      toast.success(data.message)
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
