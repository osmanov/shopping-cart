import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { itemsListSelector, addToCart } from '../../ducks/market'
import { moduleName } from '../../ducks/shop'
class Market extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired
  }

  handleOnClickRow = item => {
    const { addToCart } = this.props
    return () => addToCart(item)
  }
  render() {
    const { items } = this.props

    return (
      <ul>
        {items.map(item => (
          <li key={shortid.generate()}>
            {item.title} {item.quantity}
            <button
              type="button"
              disabled={item.quantity === 0}
              onClick={this.handleOnClickRow(item)}
            >
              добавить в корзину
            </button>
          </li>
        ))}
      </ul>
    )
  }
}
export default connect(
  state => ({
    items: itemsListSelector(state)
  }),
  { addToCart }
)(Market)
