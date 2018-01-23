import { FETCH_ITEMS_SUCCESS } from './shop'
import { SEND_PURCHASE_SUCCESS } from './cart'
import reducer, { ADD_TO_CART, REMOVE_FROM_CART, SORT_ITEMS } from './market'
import items from '../api/items.json'

/**
 * Reducer Tests
 */
it('reducer should get items', () => {
  const state = {
    items,
    loading: false
  }

  const newState = reducer(state, { type: FETCH_ITEMS_SUCCESS, payload: items })
  expect(newState).toEqual(state)
})

it('reducer should add to cart', () => {
  const inState = {
    items: [
      { id: 1, title: 'Ананасы кусочками', price: 139, quantity: 1 },
      { id: 2, title: 'Креветки королевские', price: 429, quantity: 8 }
    ]
  }
  const outState = {
    items: [
      { id: 1, title: 'Ананасы кусочками', price: 139, quantity: 1 },
      { id: 2, title: 'Креветки королевские', price: 429, quantity: 7 }
    ]
  }
  const newState = reducer(inState, { type: ADD_TO_CART, payload: { id: 2 } })
  expect(newState).toEqual(outState)
})

it('reducer should remove from cart', () => {
  const inState = {
    items: [
      { id: 1, title: 'Ананасы кусочками', price: 139, quantity: 1 },
      { id: 2, title: 'Креветки королевские', price: 429, quantity: 7 }
    ]
  }
  const outState = {
    items: [
      { id: 1, title: 'Ананасы кусочками', price: 139, quantity: 1 },
      { id: 2, title: 'Креветки королевские', price: 429, quantity: 8 }
    ]
  }
  const newState = reducer(inState, {
    type: REMOVE_FROM_CART,
    payload: { id: 2 }
  })
  expect(newState).toEqual(outState)
})

it('reducer should sort items by stable way', () => {
  const state = {
    items
  }

  const newState = reducer(state, {
    type: SORT_ITEMS,
    payload: 'quantity'
  })
  expect(newState.items.map(item => item.quantity)).toEqual([1, 2, 3, 5, 8])
})

it('reducer should reset state to initial', () => {
  const inState = {
    items,
    loading: true
  }
  const outState = {
    items: [],
    loading: false
  }
  const newState = reducer(inState, {
    type: SEND_PURCHASE_SUCCESS
  })
  expect(newState).toEqual(outState)
})
