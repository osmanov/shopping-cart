import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { itemsListSelector } from '../../ducks/cart'
import { removeFromCart, addToCart } from '../../ducks/market'
class Cart extends Component {
  handleAddClick = item => {
    return () => this.props.addToCart(item)
  }
  render() {
    const { items } = this.props
    if (!items.length) return <h1>Корзина пуста</h1>
    return (
      <ul>
        {items.map(entity => {
          const { description, disabledStatus, item: { title } } = entity

          return (
            <li key={shortid.generate()}>
              {title} {description}
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
      </ul>
    )
  }
}
export default connect(
  state => ({
    items: itemsListSelector(state)
  }),
  { addToCart }
)(Cart)
