import { createSlice } from "@reduxjs/toolkit"
import { getBooks, getSingleBook } from "./booksThunk"
import { Book, GetBooksQueryParams, GetBooksResponse } from "@/types/api"

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
  isBooksLoading: false,
  isBooksError: false,
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
      .addCase(getSingleBook.pending, (state) => {
        state.isBooksError = false
        state.isBooksLoading = true
        // state.singleBook = undefined
      })
      .addCase(getSingleBook.fulfilled, (state, { payload }) => {
        state.singleBook = payload
        state.isBooksLoading = false
      })
      .addCase(getSingleBook.rejected, (state) => {
        state.isBooksError = true
        state.isBooksLoading = false
      })
  },
})

export const { setView, setQueryParams, resetQueryParams } = booksSlice.actions

export default booksSlice.reducer
