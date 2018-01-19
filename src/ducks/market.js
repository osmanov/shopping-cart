import { createSelector } from 'reselect'
import sortBy from 'lodash.sortby'
import { all, call, put, take, takeEvery } from 'redux-saga/effects'
import { FETCH_ITEMS_SUCCESS } from './shop'
import { SEND_PURCHASE_SUCCESS } from './cart'
import { appName } from '../config'

export const moduleName = 'market'
const prefix = `${appName}/${moduleName}`

export const ADD_TO_CART = `${prefix}/ADD_TO_CART`
export const REMOVE_FROM_CART = `${prefix}/REMOVE_FROM_CART`
export const SORT_ITEMS = `${prefix}/SORT_ITEMS`

const initialState = {
  loading: false,
  sortOrderBy: 'ask',
  items: []
}

export const stateSelector = state => state[moduleName]
export const itemsListSelector = createSelector(
  stateSelector,
  state => state.items
)
export default function reducer(state = initialState, action) {
  const { type, payload, error } = action

  switch (type) {
    case SEND_PURCHASE_SUCCESS:
      return { ...initialState }
    case FETCH_ITEMS_SUCCESS:
      return { ...state, loading: false, items: [...payload] }
    case ADD_TO_CART:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity - 1 }
          }
          return item
        })
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 }
          }
          return item
        })
      }

    case SORT_ITEMS:
      const sortOrderBy = state.sortOrderBy === 'ask' ? 'desk' : 'ask'
      const sortedItems = sortBy(state.items, o => o[payload])

      return {
        ...state,
        sortOrderBy,
        items: sortOrderBy === 'ask' ? sortedItems : sortedItems.reverse()
      }
    default:
      return state
  }
}
export function addToCart(item) {
  return {
    type: ADD_TO_CART,
    payload: item
  }
}
export function removeFromCart(item) {
  return {
    type: REMOVE_FROM_CART,
    payload: item
  }
}
export function sortItems(name) {
  return {
    type: SORT_ITEMS,
    payload: name
  }
}
