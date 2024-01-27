import { createSlice } from "@reduxjs/toolkit"
import { getBookLendHistory, getReadersBorrowedBooks } from "./lendBookThunk"
import { GetLendBookHistoryResponse, RequestStatus } from "@/types/api"

interface LendBookInitialState {
  status: RequestStatus
  singleBookLendHistory: GetLendBookHistoryResponse | undefined
  singleReadersBorrowedBooks: GetLendBookHistoryResponse | undefined
}
const initialState: LendBookInitialState = {
  status: "idle",
  singleBookLendHistory: undefined,
  singleReadersBorrowedBooks: undefined,
}
const lendBookSlice = createSlice({
  name: "lendBook",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBookLendHistory.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getBookLendHistory.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getBookLendHistory.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.singleBookLendHistory = payload
      })
      .addCase(getReadersBorrowedBooks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getReadersBorrowedBooks.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getReadersBorrowedBooks.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.singleReadersBorrowedBooks = payload
      })
  },
})
// export const {} = lendBookSlice.actions
export default lendBookSlice.reducer
