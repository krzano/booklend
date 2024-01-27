import {
  GetReadersQueryParams,
  GetReadersResponse,
  Reader,
  RequestStatus,
} from "@/types/api"
import { createSlice } from "@reduxjs/toolkit"
import { getReaders, getSingleReader } from "./readersThunk"

export interface ReadersDataValues {
  readersList: GetReadersResponse["data"]
  totalItems: GetReadersResponse["totalItems"]
  numOfPages: GetReadersResponse["numOfPages"]
}
interface ReadersInitialState {
  status: RequestStatus
  readersData: ReadersDataValues | undefined
  queryParams: GetReadersQueryParams
  singleReader: Reader | undefined
}

const defaultQueryParams: GetReadersQueryParams = {
  currentPage: 1,
  pageSize: 5,
  sortBy: "lastName",
  sortDirection: "asc",
  search: "",
}

const initialState: ReadersInitialState = {
  status: "idle",
  readersData: undefined,
  queryParams: defaultQueryParams,
  singleReader: undefined,
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
        state.status = "loading"
      })
      .addCase(getReaders.fulfilled, (state, { payload }) => {
        state.status = "idle"
        if (payload) {
          state.readersData = {
            readersList: payload.data,
            numOfPages: payload.numOfPages,
            totalItems: payload.totalItems,
          }
        }
      })
      .addCase(getReaders.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(getSingleReader.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getSingleReader.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.singleReader = payload
      })
      .addCase(getSingleReader.rejected, (state) => {
        state.status = "failed"
      })
  },
})

export const { setQueryParams } = readersSlice.actions

export default readersSlice.reducer
