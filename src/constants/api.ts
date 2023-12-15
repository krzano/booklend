export const BASE_URL = import.meta.env.VITE_API_URL

const AUTH_BASE__ENDPOINT = "/auth"

export const AUTH_LOGIN__ENDPOINT = `${AUTH_BASE__ENDPOINT}/login`
export const AUTH_REGISTER_ENDPOINT = `${AUTH_BASE__ENDPOINT}/register`
export const AUTH_REFRESH_TOKEN_ENDPOINT = `${AUTH_BASE__ENDPOINT}/refreshToken`
export const AUTH_ME_ENDPOINT = `${AUTH_BASE__ENDPOINT}/me`
export const AUTH_UPDATE_PASSWORD_ENDPOINT = `${AUTH_ME_ENDPOINT}/updatePassword`
export const AUTH_UPLOAD_PHOTO_ENDPOINT = `${AUTH_ME_ENDPOINT}/uploadPhoto`
export const BOOKS_ENDPOINT = "/books"
export const BOOKS_UPLOAD_PHOTO_ENDPOINT = `${BOOKS_ENDPOINT}/uploadPhoto`
export const GENRES_ENDPOINT = "/genres"
export const READERS_ENDPOINT = "/readers"
export const READERS_UPLOAD_PHOTO_ENDPOINT = `${READERS_ENDPOINT}/uploadPhoto`
export const LEND_BOOK_ENDPOINT = "/lend-book"
export const LEND_BOOK_READER_ENDPOINT = `${LEND_BOOK_ENDPOINT}/reader`
