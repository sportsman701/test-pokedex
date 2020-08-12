import { Action } from 'redux-actions'

export type Method = 'get' | 'post' | 'put' | 'delete'

export interface RequestPayload {
  selectorKey: string
  requestSelectorKey: string
  method: Method
}

export type RequestPendingPayload = RequestPayload

export interface RequestSuccessPayload<T> extends RequestPayload {
  meta?: any
  data: T
}

export type RequestRejectedPayload<T> = RequestSuccessPayload<T>

export type RequestPendingAction = Action<RequestPendingPayload>

export type RequestSuccessAction<T = any> = Action<RequestSuccessPayload<T>>

export type RequestRejectedAction<T = any> = Action<RequestRejectedPayload<T>>

export type ApiAction<SuccessData = any, FailData = any> = Action<ApiPayload<SuccessData, FailData>>

export interface ApiPayload<SuccessData, FailData = any> {
  data?: object
  params?: object
  headers?: object
  success?: (payload: SuccessData) => any
  fail?: (error: object) => any
  onUploadProgress?: (e: any) => void
  onDownloadProgress?: (e: any) => void
  resolve?: (payload: SuccessData) => any
  reject?: (payload: FailData) => any
  [x: string]: any
}

export interface ApiConf<Response = any, SuccessData = Response, FailData = Response> {
  type?: string
  method: Method
  url: ((action: ApiAction<SuccessData, FailData>) => string) | string
  allowedParamKeys?: string[]
  defaultParams?: object
  headers?: object
  stealthy?: boolean
  success?: (payload: SuccessData, action: ApiAction<SuccessData, FailData>) => Generator
  fail?: (error: object) => Generator
  payloadOnSuccess?: (res: Response, action: ApiAction<SuccessData, FailData>) => SuccessData
  payloadOnFail?: (err: object, action: ApiAction<SuccessData, FailData>) => FailData
  metaOnSuccess?: (res: Response, action: ApiAction<SuccessData, FailData>) => any
  metaOnFail?: (res: Response, action: ApiAction<SuccessData, FailData>) => any
  requestSelectorKey?: ((payload: ApiPayload<SuccessData, FailData>) => string) | string
  selectorKey?: ((payload: ApiPayload<SuccessData, FailData>) => string) | string
}
