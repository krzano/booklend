import { ChangeUserInfoFormValues } from "@/libs/yup/schemas/changeUserInfo"

export interface ApiErrorResponse {
  errors: string[]
  message: string
  statusCode: number
}

export interface ChangeUserDataBody extends ChangeUserInfoFormValues {
  photo?: string
}

export interface GenreInterface {
  _id: string
  genreTranslationKey: string
  createdAt: string
  updatedAt: string
}

export interface GetRequestQueryParams {
  currentPage?: number
  pageSize?: number
  sortDirection?: "asc" | "desc"
  sortBy?: string
  search?: string
}
