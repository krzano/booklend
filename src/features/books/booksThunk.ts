import { BOOKS_ENDPOINT, BOOKS_UPLOAD_PHOTO_ENDPOINT } from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { AddBookFormValues } from "@/libs/yup/schemas/addBook"
import { GetBooksResponse, GetRequestQueryParamsValues } from "@/types/api"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const getAllBooks = createAsyncThunk(
  "books/getAllBooks",
  async (getRequestQueryParams: GetRequestQueryParamsValues, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get<GetBooksResponse>(
        BOOKS_ENDPOINT,
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
      const { data } = await axiosProtectedInstance.post(BOOKS_ENDPOINT, {
        title,
        description,
        author,
        rating,
        genre,
        numberOfPages,
      })
      console.log(data)
      if (bookCoverImage) {
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
      }
      toast.success(data.message)
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
