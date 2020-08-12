import get from 'lodash/get'
import pick from 'lodash/pick'
import { call, put } from 'redux-saga/effects'
import { ApiConf, ApiAction } from 'types'
import { requestRejected, requestPending, requestSuccess } from './actions'

const baseURL = 'https://pokeapi.co/api/v2'

const defaultHeaders = (token: string): object => ({
  'Content-Type': 'application/json',
  Accept: 'application/json',
  ...(token
    ? {
      Authorization: `Bearer ${token}`
    }
    : {})
})

export default <Response, SuccessData = Response, FailData = Response> ({
  type,
  method, // one of 'get', 'post', 'put', 'delete'
  url,
  allowedParamKeys,
  defaultParams,
  headers,
  stealthy,
  success, // Can be function generator to use yield
  fail, // Can be function generator to use yield
  payloadOnSuccess,
  payloadOnFail,
  metaOnSuccess,
  metaOnFail,
  requestSelectorKey: requestSelectorKeyOrFunc,
  selectorKey: selectorKeyOrFunc
}: ApiConf<Response, SuccessData, FailData>) =>
  function* (action: ApiAction<SuccessData, FailData>) {
    const payload = action.payload || {}
    const {
      data,
      params,
      headers: customHeaders,
      success: successCallback,
      fail: failCallback,
      onUploadProgress,
      onDownloadProgress,
      resolve,
      reject
    } = payload

    const requestSelectorKey =
      typeof requestSelectorKeyOrFunc === 'function' ? requestSelectorKeyOrFunc(payload) : requestSelectorKeyOrFunc
    const selectorKey = typeof selectorKeyOrFunc === 'function' ? selectorKeyOrFunc(payload) : selectorKeyOrFunc
    try {
      if (!stealthy) {
        yield put(requestPending({ selectorKey, requestSelectorKey, method }))
      }

      const queryParams = { ...defaultParams, ...params }
      const token: any = null
      const urlObj = new URL(baseURL + (typeof url === 'function' ? url(action) : url))
      const searchParams = allowedParamKeys ? pick(queryParams, allowedParamKeys) : queryParams

      Object.keys(searchParams).forEach(param => {
        urlObj.searchParams.append(param, (<any>searchParams)[param])
      })

      const res = yield call(fetch, urlObj.toString(), {
        method: method.toLowerCase(),
        headers: {
          ...defaultHeaders(token),
          ...headers,
          ...(customHeaders ? customHeaders : {})
        },
        body: JSON.stringify(data)
      })
      
      if (res.status >= 400) {
        throw { status: res.status }
      }

      const parsed = yield res.json()
      const payload = payloadOnSuccess ? payloadOnSuccess(parsed, action) : parsed
      const meta = metaOnSuccess ? metaOnSuccess(parsed, action) : parsed

      yield put(
        requestSuccess({
          selectorKey,
          requestSelectorKey,
          method,
          meta,
          data: payload
        })
      )

      if (resolve) {
        // Promise parameter
        yield resolve(payload)
      }

      if (success) {
        yield success(payload, action)
      }
      successCallback && successCallback(payload)

      return true
    } catch (err) {
      console.error(err)
      const errRes = get(err, 'response', err)
      const payload = payloadOnFail ? payloadOnFail(errRes, action) : errRes
      const meta = metaOnFail ? metaOnFail(errRes, action) : errRes

      if (!stealthy) {
        yield put(
          requestRejected({
            selectorKey,
            requestSelectorKey,
            method,
            meta,
            data: payload
          })
        )
      }

      if (reject) {
        // Promise parameter
        yield reject(payload)
      }

      if (fail) {
        yield fail(errRes)
      }

      failCallback && failCallback(errRes)

      return false
    }
  }
