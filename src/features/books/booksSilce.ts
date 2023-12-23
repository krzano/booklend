import { createSlice } from "@reduxjs/toolkit"
import { getAllBooks } from "./booksThunk"
import { GetBooksResponse } from "@/types/api"

interface BooksInitialState {
  isBooksLoading: boolean
  allBooks: GetBooksResponse | undefined
}

const initialState: BooksInitialState = {
  isBooksLoading: false,
  allBooks: undefined,
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBooks.pending, (state) => {
        state.isBooksLoading = true
      })
      .addCase(getAllBooks.fulfilled, (state, { payload }) => {
        state.isBooksLoading = false
        state.allBooks = payload
      })
  },
})

// export const {} = booksSlice.actions

export default booksSlice.reducer
