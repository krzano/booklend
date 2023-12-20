import { AUTH_LOGIN__ENDPOINT } from "@/constants/api"
import { ApiErrorResponse } from "@/types/api"
import { GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { isAxiosError } from "axios"
import { toast } from "react-toastify"

interface thunkErrorHandlerParameters {
  error: unknown
  thunkAPI: GetThunkAPI<any>
}

const thunkErrorHandler = ({
  error,
  thunkAPI,
}: thunkErrorHandlerParameters) => {
  console.log("thunkErrorHandler: ", error)
  if (isAxiosError<ApiErrorResponse>(error) && error.response) {
    if (
      error.response.data.statusCode !== 401 ||
      (error.response.data.statusCode === 401 &&
        error.response.config.url === AUTH_LOGIN__ENDPOINT)
    ) {
      toast.error(error.response.data.errors[0])
    }
    return thunkAPI.rejectWithValue(error.response.data.errors[0])
  } else {
    return thunkAPI.rejectWithValue(error)
  }
}

export default thunkErrorHandler
