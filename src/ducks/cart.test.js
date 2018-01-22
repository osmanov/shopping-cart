import { take, call, put } from 'redux-saga/effects'
import { postItems } from '../api'
import items from '../api/items.json'
import { removeState } from '../redux/localStorage'
import { FETCH_ITEMS_REQUEST } from './shop'
import reducer, {
  addItemSaga,
  removeItemSaga,
  sendPurchaseSaga,
  itemsListSelector,
  totalSelector,
  ADD_ITEM,
  REMOVE_ITEM,
  SORT_ITEMS,
  SEND_PURCHASE_REQUEST,
  SEND_PURCHASE_SUCCESS,
  SEND_PURCHASE_ERROR,
  RESET_ME
} from './cart'

/**
 * Saga Tests
 */
it('saga should add item', () => {
  const saga = addItemSaga({ payload: items[0] })
  expect(saga.next().value).toEqual(
    put({
      type: ADD_ITEM,
      payload: items[0]
    })
  )
})
it('saga should remove item', () => {
  const requestAction = {
    type: SEND_PURCHASE_REQUEST
  }

  const saga = removeItemSaga({ payload: items[0] })
  expect(saga.next().value).toEqual(
    put({
      type: REMOVE_ITEM,
      payload: items[0]
    })
  )
})

it('saga should send purchase', () => {
  const saga = sendPurchaseSaga()
  const requestAction = {
    type: SEND_PURCHASE_REQUEST,
    payload: items
  }
  expect(saga.next().value).toEqual(take(SEND_PURCHASE_REQUEST))
  expect(saga.next(requestAction).value).toEqual(call(postItems, items))
  expect(saga.next().value).toEqual(
    put({
      type: SEND_PURCHASE_SUCCESS
    })
  )
  expect(saga.next().value).toEqual(call(removeState))
  expect(saga.next().value).toEqual(
    put({
      type: FETCH_ITEMS_REQUEST
    })
  )
  const error = new Error()

  expect(saga.throw(error).value).toEqual(
    put({
      type: SEND_PURCHASE_ERROR,
      error
    })
  )
})

/**
 * Reducer Tests
 */
it('reducer should create item if it does not exist', () => {
  const inState = {
    items: [{ id: 1, price: 139 }, { id: 2, price: 429 }]
  }
  const outState = {
    items: [{ id: 1, price: 139 }, { id: 2, price: 429 }, { id: 3, price: 120 }]
  }
  const newState = reducer(inState, {
    type: ADD_ITEM,
    payload: outState.items[2]
  })
  expect(newState).toEqual(outState)
})

it('reducer should add item if it exists', () => {
  const inState = {
    items: [{ id: 1, price: 139 }]
  }
  const outState = {
    items: [{ id: 1, price: [139, 139] }]
  }
  const newState = reducer(inState, {
    type: ADD_ITEM,
    payload: inState.items[0]
  })
  expect(newState).toEqual(outState)
})

it('reducer should destroy item if it does not exist anymore', () => {
  const state = {
    items: [{ id: 1, price: 139 }]
  }
  const newState = reducer(state, {
    type: REMOVE_ITEM,
    payload: state.items[0]
  })
  expect(newState).toEqual({ items: [] })
})

it('reducer should remove item if it has been already existed', () => {
  const state = {
    items: [{ id: 1, price: [139, 139] }]
  }
  const newState = reducer(state, {
    type: REMOVE_ITEM,
    payload: { id: 1 }
  })
  expect(newState).toEqual({ items: [{ id: 1, price: 139 }] })
})

it('reducer should sort items by stable sort', () => {
  const payload = [
    { id: 20, price: 3 },
    { id: 2, price: 12 },
    { id: 1, price: 125 }
  ]
  const inState = {
    items: [{ id: 2, price: 12 }, { id: 20, price: 3 }, { id: 1, price: 125 }]
  }
  const newState = reducer(inState, {
    type: SORT_ITEMS,
    payload
  })
  const outState = {
    items: payload
  }
  expect(newState).toEqual(outState)
})
it('reducer should send items', () => {
  const InState = {
    loading: true,
    sended: false,
    error: null
  }
  const outState = {
    loading: false,
    sended: true,
    error: null
  }

  const newState = reducer(InState, {
    type: SEND_PURCHASE_SUCCESS
  })
  expect(newState).toEqual(outState)
})
it('reducer should reset state to initial', () => {
  const inState = {
    items,
    loading: true,
    sended: true,
    error: null
  }
  const outState = {
    items: [],
    loading: false,
    sended: false,
    error: null
  }
  const newState = reducer(inState, {
    type: RESET_ME
  })
  expect(newState).toEqual(outState)
})

/**
 * Selector Tests
 */
const itemsListSelectorMock = [
  {
    id: 1,
    title: 'test',
    item: { id: 1, quantity: 2, title: 'test', price: 1 },
    totalPrice: 2,
    quantity: 2,
    disabledStatus: {
      add: true,
      remove: false
    }
  }
]

it('itemsListSelector calculation', () => {
  let state = {
    cart: {
      items: [{ ...itemsListSelectorMock[0].item, price: [1, 1] }]
    }
  }
  expect(itemsListSelector(state)).toEqual(itemsListSelectorMock)
})
it('totalSelector calculation', () => {
  let state = {
    cart: {
      items: [{ ...itemsListSelectorMock[0].item, price: [1, 1] }]
    }
  }
  expect(totalSelector(state)).toEqual({ price: 2, quantity: 2 })
})
