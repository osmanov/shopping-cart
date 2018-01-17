import { combineReducers } from 'redux'
// import cartReducer, { moduleName as cartModule } from '../ducks/cart'
import marketReducer, { moduleName as marketModule } from '../ducks/market'

export default combineReducers({
  // [cartModule]: cartReducer,
  [marketModule]: marketReducer
})
