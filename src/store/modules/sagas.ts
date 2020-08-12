import { all } from 'redux-saga/effects'

import { saga as pokemon } from './pokemon'
// import { saga as todo } from './todo'

export default function* rootSaga() {
  yield all([
    pokemon()
    // todo()
  ])
}
