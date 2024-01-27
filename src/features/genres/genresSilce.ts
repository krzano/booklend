import { createSlice } from "@reduxjs/toolkit"
import { getAllGenres } from "./genresThunk"
import { GetGenresResponse, RequestStatus } from "@/types/api"

interface GenresInitialState {
  status: RequestStatus
  genres: GetGenresResponse | undefined
}

const initialState: GenresInitialState = {
  status: "idle",
  genres: undefined,
}

const genresSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGenres.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getAllGenres.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.genres = payload
      })
      .addCase(getAllGenres.rejected, (state) => {
        state.status = "failed"
      })
  },
})

// export const {} = genresSlice.actions

export default genresSlice.reducer
