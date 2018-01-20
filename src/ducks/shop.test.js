import { take, call, put } from 'redux-saga/effects'
import { getItems } from '../api'
import items from '../api/items.json'
import reducer, {
  fetchItemsSaga,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEMS_ERROR
} from './shop'

/**
 * Saga Tests
 */
it('saga should get items', () => {
  const saga = fetchItemsSaga()
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

/**
 * Reducer Tests
 */
it('reducer should get items', () => {
  const state = {
    items,
    loading: false,
    loaded: true,
    error: null
  }

  const newState = reducer(state, { type: FETCH_ITEMS_SUCCESS, payload: items })
  expect(newState).toEqual(state)
})
