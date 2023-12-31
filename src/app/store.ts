import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice"
import userReducer from "@/features/user/userSlice"
import booksReducer from "@/features/books/booksSilce"
import genresReducer from "@/features/genres/genresSilce"
import readersReducer from "@/features/readers/readersSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    books: booksReducer,
    genres: genresReducer,
    readers: readersReducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
