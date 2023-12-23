import { createSlice } from "@reduxjs/toolkit"
import { getAllGenres } from "./genresThunk"
import { GetGenresResponse } from "@/types/api"

interface GenresInitialState {
  isGenresLoading: boolean
  isGenresError: boolean
  genres: GetGenresResponse | undefined
}

const initialState: GenresInitialState = {
  isGenresLoading: false,
  isGenresError: false,
  genres: undefined,
}

const genresSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGenres.pending, (state) => {
        state.isGenresLoading = true
        state.isGenresError = false
      })
      .addCase(getAllGenres.fulfilled, (state, { payload }) => {
        state.isGenresLoading = false
        state.genres = payload
      })
      .addCase(getAllGenres.rejected, (state, { payload }) => {
        state.isGenresLoading = false
        state.isGenresError = true
      })
  },
})

// export const {} = genresSlice.actions

export default genresSlice.reducer
