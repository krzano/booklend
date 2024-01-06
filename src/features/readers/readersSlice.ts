import { GetReadersQueryParams, GetReadersResponse } from "@/types/api"
import { createSlice } from "@reduxjs/toolkit"
import { getReaders } from "./readersThunk"

export interface ReadersDataValues {
  readersList: GetReadersResponse["data"]
  totalItems: GetReadersResponse["totalItems"]
  numOfPages: GetReadersResponse["numOfPages"]
}
interface ReadersInitialState {
  isReadersLoading: boolean
  isReadersError: boolean
  readersData: ReadersDataValues | undefined
  queryParams: GetReadersQueryParams
}

const defaultQueryParams: GetReadersQueryParams = {
  currentPage: 1,
  pageSize: 5,
  sortBy: "lastName",
  sortDirection: "asc",
  search: "",
}

const initialState: ReadersInitialState = {
  isReadersLoading: false,
  isReadersError: false,
  readersData: undefined,
  queryParams: defaultQueryParams,
}

const readersSlice = createSlice({
  name: "readers",
  initialState,
  reducers: {
    setQueryParams: (
      state,
      { payload }: { payload: Partial<GetReadersQueryParams> },
    ) => ({
      ...state,
      queryParams: {
        ...state.queryParams,
        ...payload,
        ...(!payload.currentPage && { currentPage: 1 }),
      },
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReaders.pending, (state) => {
        state.isReadersLoading = true
        state.isReadersError = false
      })
      .addCase(getReaders.fulfilled, (state, { payload }) => {
        state.isReadersLoading = false
        if (payload) {
          state.readersData = {
            readersList: payload.data,
            numOfPages: payload.numOfPages,
            totalItems: payload.totalItems,
          }
        }
      })
      .addCase(getReaders.rejected, (state) => {
        state.isReadersLoading = false
        state.isReadersError = true
      })
  },
})

export const { setQueryParams } = readersSlice.actions

export default readersSlice.reducer
