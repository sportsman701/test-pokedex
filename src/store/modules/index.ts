import { History } from 'history'
import { combineReducers, Reducer } from 'redux'
import { connectRouter } from 'connected-react-router'

import api from './api'
import pokemon from './pokemon'

export default (history: History): Reducer =>
  combineReducers({
    api,
    pokemon,
    router: connectRouter(history)
  })
