import { createSlice } from "@reduxjs/toolkit"
import { GetSingleLendBookResponse, RequestStatus } from "@/types/api"
import { getOverviewStats } from "./overviewThunk"

interface OverviewInitialState {
  status: RequestStatus
  totalCurrentlyBorrowed: number | null
  totalBooks: number | null
  totalReaders: number | null
  recentlyBorrowedBooksList: GetSingleLendBookResponse[] | null
  recentlyPickedGenres:
    | { genreTranslationKey: string; percentage: number }[]
    | null
}

const initialState: OverviewInitialState = {
  status: "idle",
  totalCurrentlyBorrowed: null,
  totalBooks: null,
  totalReaders: null,
  recentlyBorrowedBooksList: null,
  recentlyPickedGenres: null,
}

const overviewSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOverviewStats.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getOverviewStats.fulfilled, (state, { payload }) => {
        state.status = "idle"
        if (payload) {
          state.totalBooks = payload.totalBooks
          state.totalCurrentlyBorrowed = payload.totalCurrentlyBorrowed
          state.totalReaders = payload.totalReaders
          state.recentlyBorrowedBooksList = payload.recentlyBorrowedBooks.slice(
            0,
            5,
          )
          const recentlyBorrowedGenres = payload.recentlyBorrowedBooks.flatMap(
            (item) => {
              return item.bookData.genre
            },
          )
          const initialGenresCount: {
            [key: (typeof recentlyBorrowedGenres)[number]]: number
          } = {}
          const genresCount = recentlyBorrowedGenres.reduce(
            (accumulator, currentGenre) => {
              accumulator[currentGenre] = ++accumulator[currentGenre] || 1
              return accumulator
            },
            initialGenresCount,
          )
          const recentlyPickedGenres = Object.entries(genresCount).map(
            ([key, value]) => {
              return {
                genreTranslationKey: key,
                percentage: parseFloat(
                  ((value / recentlyBorrowedGenres.length) * 100).toFixed(),
                ),
              }
            },
          )
          state.recentlyPickedGenres = recentlyPickedGenres.sort(
            (a, b) => b.percentage - a.percentage,
          )
        }
      })
      .addCase(getOverviewStats.rejected, (state) => {
        state.status = "failed"
      })
  },
})

// export const {} = overviewSlice.actions

export default overviewSlice.reducer
