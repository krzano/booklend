import { createSlice } from "@reduxjs/toolkit"
import {
  changeUserData,
  getUserData,
  removeUserPhoto,
  uploadUserPhoto,
} from "./userThunk"

export interface UserData {
  firstName: string
  lastName: string
  email: string
  photo: string
}

export interface UserState {
  isUserDataLoading: boolean
  isUserDataError: boolean
  userData: UserData
}

const initialState: UserState = {
  isUserDataLoading: false,
  isUserDataError: false,
  userData: { firstName: "", lastName: "", email: "", photo: "" },
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.isUserDataLoading = true
        state.isUserDataError = false
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.isUserDataLoading = false
        state.userData = payload
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.isUserDataLoading = false
        state.isUserDataError = true
        console.log(payload)
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
      .addCase(changeUserData.rejected, (state) => {
        console.log("rejected")
        return { ...state }
      })
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
