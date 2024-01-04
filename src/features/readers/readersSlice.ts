import { createSlice } from "@reduxjs/toolkit"

interface ReadersInitialState {
  isReadersLoading: boolean
  isReadersError: boolean
}

const initialState: ReadersInitialState = {
  isReadersLoading: false,
  isReadersError: false,
}

const readersSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
})

// export const {} = readersSlice.actions

export default readersSlice.reducer
