import { createSlice } from "@reduxjs/toolkit"
import { getAllBooks, getAllGenres } from "./booksThunk"
import { GenreInterface } from "@/types/api"
interface BookData {
  title: string
  author: string
  description: string
  rating: number
  genre: string
  numberOfPages: number
  photo: string | undefined
}
interface BooksInitialState {
  isBooksLoading: boolean
  allBooks: BookData[]
  genres: GenreInterface[]
}

const initialState: BooksInitialState = {
  isBooksLoading: false,
  allBooks: [],
  genres: [],
}

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGenres.pending, (state) => {
        state.isBooksLoading = true
      })
      .addCase(getAllGenres.fulfilled, (state, { payload }) => {
        state.isBooksLoading = false
        state.genres = payload
      })
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
