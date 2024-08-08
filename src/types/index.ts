export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'connect'
  | 'CONNECT'
  | 'trace'
  | 'TRACE'

export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
}
