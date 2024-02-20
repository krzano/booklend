import {
  BOOKS_ENDPOINT,
  LEND_BOOK_ENDPOINT,
  READERS_ENDPOINT,
} from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import {
  GetBooksResponse,
  GetLendBookHistoryQueryParams,
  GetLendBookHistoryResponse,
  GetReadersResponse,
} from "@/types/api"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getOverviewStats = createAsyncThunk(
  "overview/getOverviewStats",
  async (_, thunkAPI) => {
    try {
      const {
        data: { totalItems: totalBooks },
      } = await axiosProtectedInstance.get<GetBooksResponse>(BOOKS_ENDPOINT, {
        params: {
          pageSize: 1,
          genre: "",
        },
      })
      const {
        data: { totalItems: totalReaders },
      } = await axiosProtectedInstance.get<GetReadersResponse>(
        READERS_ENDPOINT,
        {
          params: {
            pageSize: 1,
          },
        },
      )
      const {
        data: { totalItems: totalCurrentlyBorrowed },
      } = await axiosProtectedInstance.get<GetLendBookHistoryResponse>(
        LEND_BOOK_ENDPOINT,
        {
          params: {
            pageSize: 1,
            lendStatus: "borrowed",
          },
        },
      )
      const recentlyBorrowedBooksQueryParams: GetLendBookHistoryQueryParams = {
        currentPage: 1,
        pageSize: 5,
        lendStatus: "all",
        sortBy: "createdAt",
        sortDirection: "desc",
      }
      const {
        data: { data: recentlyBorrowedBooks },
      } = await axiosProtectedInstance.get<GetLendBookHistoryResponse>(
        LEND_BOOK_ENDPOINT,
        {
          params: recentlyBorrowedBooksQueryParams,
        },
      )
      return {
        totalBooks,
        totalReaders,
        totalCurrentlyBorrowed,
        recentlyBorrowedBooks,
      }
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
