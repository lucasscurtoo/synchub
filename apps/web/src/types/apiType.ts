export interface responseType {
  status: number
  message: string
  data: [{}]
}
export interface ErrorResponseType {
  statusCode: number
  message: string
  timestamp: string
  path: string
}

export interface LoginBody {
  email: string
  password: string
}
