import { RootState } from "@/app/store"
import {
  READERS_DELETE_PHOTO_ENDPOINT,
  READERS_ENDPOINT,
  READERS_UPLOAD_PHOTO_ENDPOINT,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { AddReaderFormValues } from "@/libs/yup/schemas/addReader"
import { GetReadersResponse, GetReadersQueryParams, Reader } from "@/types/api"
import generateUniqueFileName from "@/utils/generateUniqueFileName"
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
        const newFileName = generateUniqueFileName(
          readerImage.name,
          "readerPhoto",
        )
        const formData = new FormData()
        formData.append("file", readerImage, newFileName)
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
export const getReaders = createAsyncThunk(
  "readers/getReaders",
  async (getRequestQueryParams: GetReadersQueryParams, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get<GetReadersResponse>(
        READERS_ENDPOINT,
        {
          params: {
            ...getRequestQueryParams,
          },
        },
      )
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const deleteReader = createAsyncThunk(
  "readers/deleteReader",
  async (readerId: string, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.delete(
        `${READERS_ENDPOINT}/${readerId}`,
      )
      toast.success(data.message)
      const state = thunkAPI.getState() as RootState
      thunkAPI.dispatch(getReaders(state.readers.queryParams))
      return readerId
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const getSingleReader = createAsyncThunk(
  "readers/getSingleReader",
  async (readerId: string, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get<Reader>(
        `${READERS_ENDPOINT}/${readerId}`,
      )
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const editReader = createAsyncThunk(
  "readers/editReader",
  async (
    {
      readerId,
      editReaderValues: {
        firstName,
        lastName,
        phoneNumber,
        address,
        readerImage,
      },
    }: { readerId: string; editReaderValues: AddReaderFormValues },
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.put(
        `${READERS_ENDPOINT}/${readerId}`,
        {
          firstName,
          lastName,
          phoneNumber,
          address,
        },
      )
      if (readerImage) {
        const newFileName = generateUniqueFileName(
          readerImage.name,
          "readerPhoto",
        )
        const formData = new FormData()
        formData.append("file", readerImage, newFileName)
        const photoResponse = await axiosProtectedInstance.post(
          `${READERS_UPLOAD_PHOTO_ENDPOINT}/${readerId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        toast.success(photoResponse.data.message)
        toast.success(data.message)
        return {
          firstName,
          lastName,
          phoneNumber,
          address,
          photo: `/uploads/${newFileName}`,
        }
      }
      toast.success(data.message)
      return { firstName, lastName, phoneNumber, address }
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const deleteReaderPhoto = createAsyncThunk(
  "readers/deleteReaderPhoto",
  async (bookId: string, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.delete(
        `${READERS_DELETE_PHOTO_ENDPOINT}/${bookId}`,
      )
      toast.success(data.message)
      return bookId
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
