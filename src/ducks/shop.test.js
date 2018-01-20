import { take, call, put } from 'redux-saga/effects'
import { getItems } from '../api'
import reducer, {
  fetchItemsSaga,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_ERROR
} from './shop'

it('should get items', () => {
  const saga = fetchItemsSaga()
  const items = [{ id: 1, title: 'apple', price: 50, quantity: 1 }]
  const requestAction = {
    type: FETCH_ITEMS_REQUEST
  }
  expect(saga.next().value).toEqual(take(FETCH_ITEMS_REQUEST))
  expect(saga.next().value).toEqual(call(getItems))
  expect(saga.next(items).value).toEqual(
    put({
      type: FETCH_ITEMS_SUCCESS,
      payload: items
    })
  )
  const error = new Error()

  expect(saga.throw(error).value).toEqual(
    put({
      type: FETCH_ITEMS_ERROR,
      error
    })
  )
})
