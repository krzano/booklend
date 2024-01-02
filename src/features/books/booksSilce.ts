import { createSlice } from "@reduxjs/toolkit"
import { getBooks } from "./booksThunk"
import { GetBooksResponse, GetRequestQueryParams } from "@/types/api"

export enum ViewVariants {
  list,
  grid,
}

interface BooksDataValues {
  booksList: GetBooksResponse["data"]
  totalItems: GetBooksResponse["totalItems"]
  numOfPages: GetBooksResponse["numOfPages"]
}

interface BooksInitialState {
  isBooksLoading: boolean
  isBooksError: boolean
  booksData: BooksDataValues | undefined
  view: ViewVariants
  queryParams: GetRequestQueryParams
}

const defaultQueryParams: GetRequestQueryParams = {
  currentPage: 1,
  pageSize: 9,
  sortBy: "title",
  sortDirection: "asc",
  search: "",
  genre: "",
}

const initialState: BooksInitialState = {
  isBooksLoading: false,
  isBooksError: false,
  booksData: undefined,
  view: ViewVariants.grid,
  queryParams: defaultQueryParams,
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setView: (state, { payload }: { payload: ViewVariants }) => {
      state.view = payload
      state.queryParams.currentPage = 1
      state.queryParams.pageSize = payload === ViewVariants.grid ? 9 : 14
    },
    setQueryParams: (
      state,
      { payload }: { payload: GetRequestQueryParams },
    ) => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        ...payload,
        ...(payload.genre &&
          Array.isArray(payload.genre) && {
            genre: payload.genre.join("_"),
          }),
      },
    }),
    resetQueryParams: (state) => {
      state.queryParams = defaultQueryParams
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.isBooksLoading = true
        state.isBooksError = false
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.isBooksLoading = false
        if (payload) {
          state.booksData = {
            booksList: payload.data,
            numOfPages: payload.numOfPages,
            totalItems: payload.totalItems,
          }
        }
      })
      .addCase(getBooks.rejected, (state) => {
        state.isBooksLoading = false
        state.isBooksError = true
      })
  },
})

export const { setView, setQueryParams, resetQueryParams } = booksSlice.actions

export default booksSlice.reducer
