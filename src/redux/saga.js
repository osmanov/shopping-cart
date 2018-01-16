import { saga as cartSaga } from '../ducks/cart'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([cartSaga()])
}
