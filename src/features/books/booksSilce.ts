import { createSlice } from "@reduxjs/toolkit"
import { getBooks, getSingleBook } from "./booksThunk"
import {
  Book,
  GetBooksQueryParams,
  GetBooksResponse,
  RequestStatus,
} from "@/types/api"

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
  status: RequestStatus
  booksData: BooksDataValues | undefined
  view: ViewVariants
  queryParams: GetBooksQueryParams
  singleBook: Book | undefined
}

const defaultQueryParams: GetBooksQueryParams = {
  currentPage: 1,
  pageSize: 9,
  sortBy: "title",
  sortDirection: "asc",
  search: "",
  genre: "",
}

const initialState: BooksInitialState = {
  status: "idle",
  booksData: undefined,
  view: ViewVariants.grid,
  queryParams: defaultQueryParams,
  singleBook: undefined,
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
      { payload }: { payload: Partial<GetBooksQueryParams> },
    ) => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        ...payload,
        ...(payload.genre &&
          Array.isArray(payload.genre) && {
            genre: payload.genre.join("_"),
          }),
        ...(!payload.currentPage && { currentPage: 1 }),
      },
    }),
    resetQueryParams: (state) => {
      return {
        ...state,
        queryParams: {
          ...defaultQueryParams,
          pageSize: state.view === ViewVariants.grid ? 9 : 14,
        },
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBooks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getBooks.fulfilled, (state, { payload }) => {
        state.status = "idle"
        if (payload) {
          state.booksData = {
            booksList: payload.data,
            numOfPages: payload.numOfPages,
            totalItems: payload.totalItems,
          }
        }
      })
      .addCase(getBooks.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getSingleBook.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSingleBook.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.singleBook = payload
      })
      .addCase(getSingleBook.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setView, setQueryParams, resetQueryParams } = booksSlice.actions

export default booksSlice.reducer
