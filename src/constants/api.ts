export const BASE_URL = import.meta.env.VITE_API_URL
export const UPLOADS_BASE_URL = `${BASE_URL}/uploads`

const AUTH_BASE_ENDPOINT = "/auth"

export const AUTH_LOGIN__ENDPOINT = `${AUTH_BASE_ENDPOINT}/login`
export const AUTH_REGISTER_ENDPOINT = `${AUTH_BASE_ENDPOINT}/register`
export const AUTH_REFRESH_TOKEN_ENDPOINT = `${AUTH_BASE_ENDPOINT}/refreshToken`
export const AUTH_ME_ENDPOINT = `${AUTH_BASE_ENDPOINT}/me`
export const AUTH_REMOVE_ACCOUNT_ENDPOINT = `${AUTH_ME_ENDPOINT}/removeAccount`
export const AUTH_UPDATE_PASSWORD_ENDPOINT = `${AUTH_ME_ENDPOINT}/updatePassword`
export const AUTH_UPLOAD_PHOTO_ENDPOINT = `${AUTH_ME_ENDPOINT}/uploadPhoto`
export const AUTH_REMOVE_PHOTO_ENDPOINT = `${AUTH_ME_ENDPOINT}/removePhoto`
export const BOOKS_ENDPOINT = "/books"
export const BOOKS_UPLOAD_PHOTO_ENDPOINT = `${BOOKS_ENDPOINT}/uploadPhoto`
export const BOOKS_DELETE_PHOTO_ENDPOINT = `${BOOKS_ENDPOINT}/deletePhoto`
export const GENRES_ENDPOINT = "/genres"
export const READERS_ENDPOINT = "/readers"
export const READERS_UPLOAD_PHOTO_ENDPOINT = `${READERS_ENDPOINT}/uploadPhoto`
export const READERS_DELETE_PHOTO_ENDPOINT = `${READERS_ENDPOINT}/deletePhoto`
export const LEND_BOOK_ENDPOINT = "/lend-book"
export const READER_LEND_HISTORY_ENDPOINT = `${LEND_BOOK_ENDPOINT}/reader`
export const BOOK_LEND_HISTORY_ENDPOINT = `${LEND_BOOK_ENDPOINT}/book`
