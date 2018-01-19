import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import reducer from './reducer'
import rootSaga from './saga'
import { loadState, saveState } from './localStorage'

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]
if (process.env.NODE_ENV !== 'production') {
  middleware.push(logger)
}
const enhancer = applyMiddleware(...middleware)
const persistedState = loadState()
const store = createStore(reducer, persistedState, enhancer)
store.subscribe(() => {
  saveState(store.getState())
}, 1000)
window.store = store

sagaMiddleware.run(rootSaga)

export default store
