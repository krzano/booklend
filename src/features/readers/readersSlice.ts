import { GetReadersQueryParams, GetReadersResponse, Reader } from "@/types/api"
import { createSlice } from "@reduxjs/toolkit"
import {
  deleteReaderPhoto,
  editReader,
  getReaders,
  getSingleReader,
} from "./readersThunk"

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
  isReadersLoading: false,
  isReadersError: false,
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
      .addCase(getSingleReader.pending, (state) => {
        state.isReadersError = false
        state.isReadersLoading = true
      })
      .addCase(getSingleReader.fulfilled, (state, { payload }) => {
        state.singleReader = payload
        state.isReadersLoading = false
      })
      .addCase(getSingleReader.rejected, (state) => {
        state.isReadersError = true
        state.isReadersLoading = false
      })
      .addCase(editReader.fulfilled, (state, { payload }) => {
        if (payload && state.singleReader) {
          return {
            ...state,
            singleReader: { ...state.singleReader, ...payload },
          }
        }
      })
      .addCase(deleteReaderPhoto.fulfilled, (state, { payload }) => {
        if (
          payload &&
          state.singleReader &&
          state.singleReader._id === payload
        ) {
          state.singleReader.photo = null
        }
      })
  },
})

export const { setQueryParams } = readersSlice.actions

export default readersSlice.reducer
