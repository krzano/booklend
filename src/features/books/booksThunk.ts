import {
  BOOKS_ENDPOINT,
  BOOKS_UPLOAD_PHOTO_ENDPOINT,
  GENRES_ENDPOINT,
  UPLOADS_BASE_URL,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { AddBookFormValues } from "@/libs/yup/schemas/addBook"
import { GetRequestQueryParams } from "@/types/api"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const getAllGenres = createAsyncThunk(
  "books/getAllGenres",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get(GENRES_ENDPOINT)
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (
    getRequestQueryParams: GetRequestQueryParams | undefined,
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.get(BOOKS_ENDPOINT, {
        params: {
          ...getRequestQueryParams,
        },
      })
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const addBook = createAsyncThunk(
  "books/addBook",
  async (
    {
      title,
      description,
      author,
      rating,
      genre,
      numberOfPages,
      bookCoverImage,
    }: AddBookFormValues,
    thunkAPI,
  ) => {
    try {
      if (bookCoverImage) {
        const { data } = await axiosProtectedInstance.post(BOOKS_ENDPOINT, {
          title,
          description,
          author,
          rating,
          genre,
          numberOfPages,
        })
        console.log(data)
        const formData = new FormData()
        formData.append("file", bookCoverImage)
        const photoResponse = await axiosProtectedInstance.post(
          `${BOOKS_UPLOAD_PHOTO_ENDPOINT}/${data.bookId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        toast.success(photoResponse.data.message)
        toast.success(data.message)
        return data
      }
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
