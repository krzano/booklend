import { GENRES_ENDPOINT } from "@/constants/api"
import axiosProtectedInstance from "@/libs/axios/axiosPrivateInstance"
import { GetGenresResponse } from "@/types/api"
import thunkErrorHandler from "@/utils/thunkErrorHandler"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const getAllGenres = createAsyncThunk(
  "books/getAllGenres",
  async (_, thunkAPI) => {
    try {
      const { data } = await axiosProtectedInstance.get<GetGenresResponse>(
        GENRES_ENDPOINT,
      )
      return data
    } catch (error) {
      thunkErrorHandler({ error, thunkAPI })
    }
  },
)
