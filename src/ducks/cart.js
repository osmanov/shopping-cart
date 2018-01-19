import { createSelector } from 'reselect'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import isArray from 'lodash.isarray'
import { ADD_TO_CART, REMOVE_FROM_CART } from './market'
import { appName } from '../config'
import { mergeItemsByIds } from '../utils'

export const moduleName = 'cart'
const prefix = `${appName}/${moduleName}`

export const ADD_ITEM = `${prefix}/ADD_ITEM`
export const REMOVE_ITEM = `${prefix}/REMOVE_ITEM`
export const SORT_ITEMS = `${prefix}/SORT_ITEMS`

const initialState = {
  items: [],
  sortOrderBy: 'ask'
}

export const stateSelector = state => state[moduleName]
export const itemsListSelector = createSelector(stateSelector, state => {
  const { items } = state
  return items.map(item => {
    const { price, quantity } = item

    const isMultiPrice = isArray(price)

    const itemPrice = isMultiPrice ? price[0] : price
    const itemQuantity = isMultiPrice ? price.length : [price].length

    const disabledStatus = {
      add: itemQuantity === quantity,
      remove: false
    }
    return {
      id: item.id,
      title: item.title,
      item: { ...item, price: itemPrice },
      totalPrice: itemQuantity * itemPrice,
      quantity: itemQuantity,
      disabledStatus
    }
  })
})

export const totalSelector = createSelector(itemsListSelector, itemsList =>
  itemsList.reduce(
    (res, current) => ({
      price: res.price + current.totalPrice,
      quantity: res.quantity + current.quantity
    }),
    { price: 0, quantity: 0 }
  )
)

export default function reducer(state = initialState, action) {
  const { type, payload } = action
  switch (type) {
    case ADD_ITEM:
      return {
        ...state,
        items: [...mergeItemsByIds([...state.items, payload])]
      }
    case REMOVE_ITEM:
      return {
        ...state,
        items: state.items.reduce((res, current) => {
          if (current.id === payload.id) {
            const { price } = current
            if (isArray(price)) {
              const newPrice = price.slice(1)
              return [
                ...res,
                {
                  ...current,
                  price: newPrice.length > 1 ? newPrice : newPrice[0]
                }
              ]
            }
            return res
          }
          return [...res, current]
        }, [])
      }
    case SORT_ITEMS:
      const sortOrderBy = state.sortOrderBy === 'ask' ? 'desk' : 'ask'
      const sortedItems = payload.map(filteredItem => {
        return { ...state.items.filter(item => item.id === filteredItem.id)[0] }
      })

      return {
        ...state,
        sortOrderBy,
        items: sortOrderBy === 'ask' ? sortedItems : sortedItems.reverse()
      }
    default:
      return state
  }
}
export function sortItems(item) {
  return {
    type: SORT_ITEMS,
    payload: item
  }
}
export const addItemSaga = function*(action) {
  const { payload } = action
  yield put({
    type: ADD_ITEM,
    payload
  })
}
export const removeItemSaga = function*(action) {
  const { payload } = action
  yield put({
    type: REMOVE_ITEM,
    payload
  })
}
export const saga = function*() {
  yield all([
    takeEvery(ADD_TO_CART, addItemSaga),
    takeEvery(REMOVE_FROM_CART, removeItemSaga)
  ])
}
