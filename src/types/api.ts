import { ChangeUserInfoFormValues } from "@/libs/yup/schemas/changeUserInfo"
import { Dayjs } from "dayjs"

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
export interface GetBooksQueryParams {
  currentPage: number
  pageSize: number
  sortDirection: "asc" | "desc"
  sortBy: "title" | "author" | "rating" | "numberOfPages" | "createdAt"
  search: string
  genre: string | string[]
}
export interface GetReadersQueryParams {
  currentPage: number
  pageSize: number
  sortDirection: "asc" | "desc"
  sortBy: string
  search: string
}
export interface GetLendBookHistoryQueryParams {
  currentPage: number
  pageSize: number
  sortDirection: "asc" | "desc"
  sortBy: string
  lendStatus: "available" | "borrowed" | "all"
}
export interface Book {
  _id: string
  adminId: string
  title: string
  author: string
  description: string
  rating: number
  genre: string[]
  numberOfPages: number
  photo: string | null
  createdAt: string
  updatedAt: string
}
export interface Reader {
  _id: string
  adminId: string
  firstName: string
  lastName: string
  phoneNumber: string
  address: {
    street: string
    city: string
    postalCode: string
  }
  photo: string | null
  createdAt: string
  updatedAt: string
}
export interface LendBookBody {
  bookId: string
  readerId: string
  lendFrom: string | Dayjs
  lendTo: string | Dayjs
  lendStatus: "borrowed" | "available"
}
export interface GetSingleLendBookResponse extends LendBookBody {
  _id: string
  createdAt: string
  updatedAt: string
  bookData: Book
  readerData: Reader
}

export type GetGenresResponse = Genre[]
export type GetBooksResponse = GetListResponse<Book>
export type GetReadersResponse = GetListResponse<Reader>
export type GetLendBookHistoryResponse =
  GetListResponse<GetSingleLendBookResponse>
