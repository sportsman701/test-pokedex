import fp from 'lodash/fp'

import * as types from './types'
import { Method } from 'types'

export const dataSelector = (selectorKey: string, defaultVal: any = null) =>
  fp.compose(fp.defaultTo(defaultVal), fp.get(selectorKey), fp.get('api.data'))

export const requestStatusSelector = (selectorKey: string, method: Method = 'get') =>
  fp.compose(fp.defaultTo('INIT'), fp.get(method.toLowerCase()), fp.get(selectorKey), fp.get('api.requests'))

export const isRequestNil = (selectorKey: string, method: Method = 'get') =>
  fp.compose(fp.isEqual('INIT'), requestStatusSelector(selectorKey, method))

export const isRequestPending = (selectorKey: string, method: Method = 'get') =>
  fp.compose(fp.isEqual(types.REQUEST_PENDING), requestStatusSelector(selectorKey, method))

export const isRequestSuccess = (selectorKey: string, method: Method = 'get') =>
  fp.compose(fp.isEqual(types.REQUEST_SUCCESS), requestStatusSelector(selectorKey, method))

export const isRequestRejected = (selectorKey: string, method: Method = 'get') =>
  fp.compose(fp.isEqual(types.REQUEST_REJECTED), requestStatusSelector(selectorKey, method))
