import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MarketContainer from '../Market'
import CartContainer from '../Cart'
import SuccessSend from '../../components/SuccessSend'
import { itemsListSelector, moduleName, fetchItems } from '../../ducks/shop'
import { moduleName as moduleCart, resetMe as toMarket } from '../../ducks/cart'
import { removeState } from '../../redux/localStorage'

class Root extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array.isRequired,
    fetchItems: PropTypes.func.isRequired
  }
  componentWillMount() {
    const { loaded, fetchItems } = this.props
    if (!loaded) {
      fetchItems()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.cartSended !== this.props.cartSended) {
      removeState()
    }
  }
  render() {
    const { loading, cartSended, toMarket } = this.props
    if (loading) {
      return <h1>Loading...</h1>
    }
    if (cartSended) {
      return <SuccessSend toMarket={toMarket} />
    }
    return (
      <div>
        <MarketContainer />
        <hr />
        <CartContainer />
      </div>
    )
  }
}
export default connect(
  state => ({
    loading: state[moduleName].loading || state[moduleCart].loading,
    loaded: state[moduleName].loaded,
    cartSended: state[moduleCart].sended,
    items: itemsListSelector(state)
  }),
  { fetchItems, toMarket }
)(Root)
