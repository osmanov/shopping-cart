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

it('reducer should sort items by desk', () => {
  const inState = {
    sortOrderBy: 'ask',
    items: [
      { id: 1, title: 'Авакадо', price: 139, quantity: 1 },
      { id: 2, title: 'Cлон', price: 429, quantity: 2 },
      { id: 3, title: 'Cлова', price: 429, quantity: 2 }
    ]
  }
  const outState = {
    items: [
      { id: 2, title: 'Cлон', price: 429, quantity: 2 },
      { id: 3, title: 'Cлова', price: 429, quantity: 2 },
      { id: 1, title: 'Авакадо', price: 139, quantity: 1 }
    ],
    sortOrderBy: 'desk'
  }
  const newState = reducer(inState, {
    type: SORT_ITEMS,
    payload: 'quantity'
  })
  expect(newState).toEqual(outState)
})

it('reducer should sort items by ask', () => {
  const inState = {
    sortOrderBy: 'desk',
    items: [
      { id: 2, title: 'Cлон', price: 429, quantity: 2 },
      { id: 3, title: 'Cлова', price: 429, quantity: 2 },
      { id: 1, title: 'Авакадо', price: 139, quantity: 1 }
    ]
  }
  const outState = {
    items: [
      { id: 1, title: 'Авакадо', price: 139, quantity: 1 },
      { id: 2, title: 'Cлон', price: 429, quantity: 2 },
      { id: 3, title: 'Cлова', price: 429, quantity: 2 }
    ],
    sortOrderBy: 'ask'
  }
  const newState = reducer(inState, {
    type: SORT_ITEMS,
    payload: 'quantity'
  })
  expect(newState).toEqual(outState)
})

it('reducer should reset state to initial', () => {
  const inState = {
    items,
    loading: true,
    sortOrderBy: 'desk'
  }
  const outState = {
    items: [],
    sortOrderBy: 'ask',
    loading: false
  }
  const newState = reducer(inState, {
    type: SEND_PURCHASE_SUCCESS
  })
  expect(newState).toEqual(outState)
})
