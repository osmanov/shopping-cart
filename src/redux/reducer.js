import { combineReducers } from 'redux'
import cartReducer, { moduleName as cartModule } from '../ducks/cart'

export default combineReducers({
  [cartModule]: cartReducer
})
