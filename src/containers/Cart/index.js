import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { itemsListSelector } from '../../ducks/cart'
class Cart extends Component {
  render() {
    const { items } = this.props
    if (!items.length) return <h1>Корзина пуста</h1>
    return (
      <ul>
        {items.map(entity => {
          const { description, item: { title } } = entity

          return (
            <li key={shortid.generate()}>
              {title} {description}
            </li>
          )
        })}
      </ul>
    )
  }
}
export default connect(state => ({
  items: itemsListSelector(state)
}))(Cart)
