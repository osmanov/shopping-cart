import { saga as cartSaga } from '../ducks/cart'
import { saga as shopSaga } from '../ducks/shop'
import { all } from 'redux-saga/effects'

export default function* rootSaga() {
  yield all([shopSaga(), cartSaga()])
}
