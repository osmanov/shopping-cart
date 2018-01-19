import { createSelector } from 'reselect'
import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import { RESET_ME } from './cart'
import { getItems } from '../api'
import { appName } from '../config'

export const moduleName = 'shop'
const prefix = `${appName}/${moduleName}`

export const FETCH_ITEMS_REQUEST = `${prefix}/FETCH_ITEMS_REQUEST`
export const FETCH_ITEMS_SUCCESS = `${prefix}/FETCH_ITEMS_SUCCESS`
export const FETCH_ITEMS_ERROR = `${prefix}/FETCH_ITEMS_ERROR`

const initialState = {
  loading: false,
  loaded: false,
  items: [],

  error: null
}

export const stateSelector = state => state[moduleName]
export const itemsListSelector = createSelector(
  stateSelector,
  state => state.items
)

export default function reducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case FETCH_ITEMS_REQUEST:
      return { ...state, loading: true, loaded: false }
    case FETCH_ITEMS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...payload],
        loaded: true,
        error: null
      }
    case FETCH_ITEMS_ERROR:
      return { ...state, loading: false, loaded: false, error }
    default:
      return state
  }
}

export function fetchItems() {
  return {
    type: FETCH_ITEMS_REQUEST
  }
}
export const fetchItemsSaga = function*(action) {
  while (true) {
    yield take(FETCH_ITEMS_REQUEST)
    try {
      const items = yield call(getItems)
      yield put({
        type: FETCH_ITEMS_SUCCESS,
        payload: items
      })
    } catch (error) {
      yield put({
        type: FETCH_ITEMS_ERROR,
        error
      })
    }
  }
}

export const saga = function*() {
  yield all([fetchItemsSaga()])
}
