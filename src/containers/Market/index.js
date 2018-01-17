import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  itemsListSelector,
  fetchItems,
  addToCart,
  moduleName
} from '../../ducks/market'
class Market extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array.isRequired,
    fetchItems: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchItems()
  }

  handleOnClickRow = item => {
    const { addToCart } = this.props
    return () => addToCart(item)
  }
  render() {
    const { loading, items } = this.props
    if (loading) {
      return <h1>Loading...</h1>
    }
    return (
      <ul>
        {items.map(item => (
          <li key={shortid.generate()} onClick={this.handleOnClickRow(item)}>
            {item.title} {item.quantity}
          </li>
        ))}
      </ul>
    )
  }
}
export default connect(
  state => ({
    loading: state[moduleName].loading,
    items: itemsListSelector(state)
  }),
  { fetchItems, addToCart }
)(Market)
