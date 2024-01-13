import {
  BOOK_LEND_HISTORY_ENDPOINT,
  LEND_BOOK_ENDPOINT,
  READER_LEND_HISTORY_ENDPOINT,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import {
  GetLendBookHistoryQueryParams,
  GetLendBookHistoryResponse,
  LendBookBody,
} from "@/types/api"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"
import { toast } from "react-toastify"

export const createLendBook = createAsyncThunk(
  "lendBook/createLendBook",
  async (
    { bookId, readerId, lendFrom, lendTo }: Omit<LendBookBody, "lendStatus">,
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.post(LEND_BOOK_ENDPOINT, {
        bookId,
        readerId,
        lendFrom,
        lendTo,
        lendStatus: "borrowed",
      })
      toast.success(data.message)
      thunkAPI.dispatch(getBookLendHistory(bookId))
      return
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)

export const updateLendBook = createAsyncThunk(
  "lendBook/updateLendBook",
  async (
    {
      lendBookId,
      newLendBookData,
    }: { lendBookId: string; newLendBookData: LendBookBody },
    thunkAPI,
  ) => {
    try {
      const { data } = await axiosProtectedInstance.put(
        `${LEND_BOOK_ENDPOINT}/${lendBookId}`,
        newLendBookData,
      )
      toast.success(data.message)
      thunkAPI.dispatch(getBookLendHistory(newLendBookData.bookId))
      return
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const getLentBooks = createAsyncThunk(
  "lendBook/getLentBooks",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get(LEND_BOOK_ENDPOINT)
      toast.success(data.message)
      return
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const getReadersBorrowedBooks = createAsyncThunk(
  "lendBook/getReadersBorrowedBooks",
  async (
    {
      readerId,
      queryParams,
    }: { readerId: string; queryParams: GetLendBookHistoryQueryParams },
    thunkAPI,
  ) => {
    try {
      const { data } =
        await axiosProtectedInstance.get<GetLendBookHistoryResponse>(
          `${READER_LEND_HISTORY_ENDPOINT}/${readerId}`,
          {
            params: queryParams,
          },
        )
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
export const getBookLendHistory = createAsyncThunk(
  "lendBook/getBookLendHistory",
  async (bookId: string, thunkAPI) => {
    try {
      const { data } =
        await axiosProtectedInstance.get<GetLendBookHistoryResponse>(
          `${BOOK_LEND_HISTORY_ENDPOINT}/${bookId}`,
          {
            params: {
              sortBy: "createdAt",
              sortDirection: "desc",
            },
          },
        )
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
