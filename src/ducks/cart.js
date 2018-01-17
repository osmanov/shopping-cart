import { createSelector } from 'reselect'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import isArray from 'lodash.isarray'
import { ADD_TO_CART } from './market'
import { appName } from '../config'
import { mergeItemsByIds } from '../utils'

export const moduleName = 'cart'
const prefix = `${appName}/${moduleName}`

export const CREATE_ITEM = `${prefix}/CREATE_ITEM`
export const ADD_ITEM = `${prefix}/ADD_ITEM`
export const REMOVE_ITEM = `${prefix}/REMOVE_ITEM`
export const DESTROY_ITEM = `${prefix}/DESTROY_ITEM`

const initialState = {
  items: []
}

export const stateSelector = state => state[moduleName]
export const itemsListSelector = createSelector(stateSelector, state => {
  const { items } = state
  return items.map(item => {
    const { price } = item
    const description = isArray(price)
      ? `${price.length}x${price[0]}=${price.length * price[0]}`
      : `1x${price}=${price}`
    return { item, description }
  })
})

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...mergeItemsByIds([...state.items, payload])]
      }
    default:
      return state
  }
}
export const addItemSaga = function*(action) {
  const { payload } = action
  yield put({
    type: ADD_ITEM,
    payload
  })
}

export const saga = function*() {
  yield all([takeEvery(ADD_TO_CART, addItemSaga)])
}
