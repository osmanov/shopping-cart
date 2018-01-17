import { saga as marketSaga } from '../ducks/market'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([marketSaga()])
}
