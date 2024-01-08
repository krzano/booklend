import { RootState } from "@/app/store"
import {
  BOOKS_DELETE_PHOTO_ENDPOINT,
  BOOKS_ENDPOINT,
  BOOKS_UPLOAD_PHOTO_ENDPOINT,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { AddBookFormValues } from "@/libs/yup/schemas/addBook"
import { Book, GetBooksResponse, GetBooksQueryParams } from "@/types/api"
import generateUniqueFileName from "@/utils/generateUniqueFileName"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (getRequestQueryParams: GetBooksQueryParams, thunkAPI) => {
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
export const getSingleBook = createAsyncThunk(
  "books/getSingleBook",
  async (bookId: string, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get<Book>(
        `${BOOKS_ENDPOINT}/${bookId}`,
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
      if (bookCoverImage) {
        const newFileName = generateUniqueFileName(
          bookCoverImage.name,
          "readerPhoto",
        )
        const formData = new FormData()
        formData.append("file", bookCoverImage, newFileName)
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
export const editBook = createAsyncThunk(
  "books/editBook",
  async (
    {
      bookId,
      editBookValues: {
        title,
        description,
        author,
        rating,
        genre,
        numberOfPages,
        bookCoverImage,
      },
    }: { bookId: string; editBookValues: AddBookFormValues },
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.put(
        `${BOOKS_ENDPOINT}/${bookId}`,
        {
          title,
          description,
          author,
          rating,
          genre,
          numberOfPages,
        },
      )
      if (bookCoverImage) {
        const newFileName = generateUniqueFileName(
          bookCoverImage.name,
          "bookPhoto",
        )
        const formData = new FormData()
        formData.append("file", bookCoverImage, newFileName)
        const photoResponse = await axiosProtectedInstance.post(
          `${BOOKS_UPLOAD_PHOTO_ENDPOINT}/${bookId}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          },
        )
        toast.success(photoResponse.data.message)
        toast.success(data.message)
        return {
          title,
          description,
          author,
          rating,
          genre,
          numberOfPages,
          photo: `/uploads/${newFileName}`,
        }
      }
      toast.success(data.message)
      return { title, description, author, rating, genre, numberOfPages }
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const deleteBookPhoto = createAsyncThunk(
  "books/deleteBookPhoto",
  async (bookId: string, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.delete(
        `${BOOKS_DELETE_PHOTO_ENDPOINT}/${bookId}`,
      )
      toast.success(data.message)
      return bookId
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const deleteBook = createAsyncThunk(
  "books/deleteBook",
  async (bookId: string, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.delete(
        `${BOOKS_ENDPOINT}/${bookId}`,
      )
      toast.success(data.message)
      const state = thunkAPI.getState() as RootState
      thunkAPI.dispatch(getBooks(state.books.queryParams))
      return bookId
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
