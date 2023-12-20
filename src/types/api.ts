import { ChangeUserInfoFormValues } from "@/libs/yup/schemas/changeUserInfo"

export interface ApiErrorResponse {
  errors: string[]
  message: string
  statusCode: number
}

export interface ChangeUserDataBody extends ChangeUserInfoFormValues {
  photo?: string
}
