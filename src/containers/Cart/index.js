import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { itemsListSelector, totalSelector } from '../../ducks/cart'
import { removeFromCart, addToCart } from '../../ducks/market'
class Cart extends Component {
  handleAddClick = item => {
    return () => this.props.addToCart(item)
  }
  render() {
    const { items, total } = this.props
    if (!total.quantity) return <h1>Корзина пуста</h1>
    return [
      <ul key={shortid.generate()}>
        {items.map(entity => {
          const {
            disabledStatus,
            quantity,
            totalPrice,
            item: { title, price }
          } = entity

          const descriptionPrice = `${quantity}x${price}=${totalPrice}`
          return (
            <li key={shortid.generate()}>
              {title} {descriptionPrice}
              <button>-</button>
              <button
                disabled={disabledStatus.add}
                onClick={this.handleAddClick(entity.item)}
              >
                +
              </button>
            </li>
          )
        })}
      </ul>,
      <div key={shortid.generate()}>
        Итого в корзине товаров:{total.quantity} шт.
        <div>на сумму:{total.price}</div>
      </div>
    ]
  }
}
export default connect(
  state => ({
    items: itemsListSelector(state),
    total: totalSelector(state)
  }),
  { addToCart }
)(Cart)
