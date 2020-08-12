import setWith from 'lodash/setWith'
import unset from 'lodash/unset'
import { combineReducers } from 'redux'
import { handleActions } from 'redux-actions'
import { REQUEST_SUCCESS, REQUEST_REJECTED, REQUEST_PENDING } from './types'
import { RequestPendingAction, RequestSuccessAction, RequestRejectedAction } from 'types'

export const requests = handleActions(
  {
    [REQUEST_PENDING]: (state: any, { payload }: RequestPendingAction) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [payload.method]: REQUEST_PENDING
        }
      }
    },

    [REQUEST_SUCCESS]: (state, { payload }: RequestSuccessAction<any>) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [payload.method]: REQUEST_SUCCESS
        }
      }
    },

    [REQUEST_REJECTED]: (state, { payload }: RequestRejectedAction<any>) => {
      const selectorKey = payload.requestSelectorKey || payload.selectorKey
      return {
        ...state,
        [selectorKey]: {
          ...state[selectorKey],
          [payload.method]: REQUEST_REJECTED
        }
      }
    }
  },
  {}
)

// TODO: find a better way to resolve cloning issue
const cloneInPath = (state: any, path: string) => {
  if (!path) {
    return state
  }
  const pathArray = Array.isArray(path) ? path : path.split('.')
  pathArray.reduce((subState: any, path: string) => {
    subState[path] = Array.isArray(subState[path]) ? [...subState[path]] : { ...subState[path] }
    return subState[path]
  }, state)
  return { ...state }
}

export const data = handleActions(
  {
    [REQUEST_SUCCESS]: (state: any, { payload }: RequestSuccessAction<any>) => {
      return cloneInPath(setWith(state, payload.selectorKey, payload.data, Object), payload.selectorKey)
    },

    [REQUEST_REJECTED]: (state: any, { payload }: RequestRejectedAction<any>) => {
      if (payload.method.toLowerCase() === 'get') {
        unset(state, payload.selectorKey)
      }
      return state
    }
  },
  {}
)

export default combineReducers({
  data,
  requests
})
