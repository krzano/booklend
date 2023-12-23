import { ChangeUserInfoFormValues } from "@/libs/yup/schemas/changeUserInfo"

// TODO TO DO ADD ALL API TYPES HERE, AND REFACTOR THE CODE

export interface ApiErrorResponse {
  errors: string[]
  message: string
  statusCode: number
}
export interface GetListResponse<T> {
  data: T[]
  totalItems: number
  numOfPages: number
}
export interface GetUserDataResponse {
  _id: string
  firstName: string
  lastName: string
  email: string
  photo: string | null
  createdAt: string
  updatedAt: string
}
export interface ChangeUserDataBody extends ChangeUserInfoFormValues {
  photo?: string
}
export interface Genre {
  _id: string
  genreTranslationKey: string
  createdAt: string
  updatedAt: string
}
interface GetRequestQueryParams {
  currentPage?: number
  pageSize?: number
  sortDirection?: "asc" | "desc"
  sortBy?: string
  search?: string
}
export interface Book {
  title: string
  author: string
  description: string
  rating: number
  genre: string
  numberOfPages: number
  photo: string | undefined
}

export type GetGenresResponse = Genre[]
export type GetRequestQueryParamsValues = GetRequestQueryParams | undefined
export type GetBooksResponse = GetListResponse<Book>
