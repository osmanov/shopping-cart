import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import MarketContainer from '../Market'
import CartContainer from '../Cart'
import { itemsListSelector, moduleName, fetchItems } from '../../ducks/shop'
import { removeState } from '../../utils/localStorage'

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

  render() {
    const { loading, items } = this.props
    if (loading) {
      return <h1>Loading...</h1>
    }
    return (
      <div>
        <MarketContainer />
        <hr />
        <CartContainer />
        <button onClick={removeState}>reset</button>
      </div>
    )
  }
}
export default connect(
  state => ({
    loading: state[moduleName].loading,
    loaded: state[moduleName].loaded,
    items: itemsListSelector(state)
  }),
  { fetchItems }
)(Root)
