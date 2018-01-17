import { createStore, applyMiddleware } from 'redux'
import throttle from 'lodash.throttle'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import rootSaga from './saga'
import { loadState, saveState } from './localStorage'

const sagaMiddleware = createSagaMiddleware()
const enhancer = applyMiddleware(sagaMiddleware, logger)
const persistedState = loadState()
const store = createStore(reducer, persistedState, enhancer)
store.subscribe(
  throttle(() => {
    saveState(store.getState())
  }, 1000)
)
window.store = store

sagaMiddleware.run(rootSaga)

export default store
