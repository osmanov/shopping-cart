// import { saga as marketSaga } from '../ducks/market'
import { saga as shopSaga } from '../ducks/shop'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([shopSaga()])
}
