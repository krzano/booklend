import { createSlice } from "@reduxjs/toolkit"
import {
  changeUserData,
  getUserData,
  removeUserPhoto,
  uploadUserPhoto,
} from "./userThunk"
import { GetUserDataResponse, RequestStatus } from "@/types/api"

const DEMO_ACCOUNT_EMAIL = import.meta.env.VITE_DEMO_ACCOUNT_EMAIL

export interface UserState {
  status: RequestStatus
  isDemoAccount: boolean
  userData: GetUserDataResponse
}

const initialState: UserState = {
  status: "idle",
  isDemoAccount: false,
  userData: {
    _id: "",
    firstName: "",
    lastName: "",
    email: "",
    photo: "",
    createdAt: "",
    updatedAt: "",
  },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.status = "loading"
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.status = "idle"
        state.userData = payload
        if (payload.email === DEMO_ACCOUNT_EMAIL) {
          state.isDemoAccount = true
        } else {
          state.isDemoAccount = false
        }
      })
      .addCase(getUserData.rejected, (state) => {
        state.status = "failed"
      })
      .addCase(
        changeUserData.fulfilled,
        (state, { payload: { firstName, lastName, email } }) => {
          return {
            ...state,
            userData: { ...state.userData, firstName, lastName, email },
          }
        },
      )
      .addCase(uploadUserPhoto.fulfilled, (state, { payload }) => {
        if (payload) {
          state.userData.photo = payload
        }
      })
      .addCase(removeUserPhoto.fulfilled, (state) => {
        state.userData.photo = ""
      })
  },
})

// export const {} = userSlice.actions

export default userSlice.reducer
