import { createSelector } from 'reselect'
import { all, call, put, take } from 'redux-saga/effects'
import { FETCH_ITEMS_SUCCESS } from './shop'
import { appName } from '../config'

export const moduleName = 'market'
const prefix = `${appName}/${moduleName}`

export const ADD_TO_CART = `${prefix}/ADD_TO_CART`
export const REMOVE_FROM_CART = `${prefix}/REMOVE_FROM_CART`

const initialState = {
  loading: false,
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
    case FETCH_ITEMS_SUCCESS:
      return { loading: false, items: [...payload] }
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
