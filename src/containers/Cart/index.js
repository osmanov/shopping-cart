import React, { Component } from 'react'
import shortid from 'shortid'
import sortBy from 'lodash.sortby'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CartResume from '../../components/CartResume'
import { itemsListSelector, totalSelector, sortItems } from '../../ducks/cart'
import { removeFromCart, addToCart } from '../../ducks/market'
class Cart extends Component {
  handleRemoveClick = item => {
    return () => this.props.removeFromCart(item)
  }
  handleAddClick = item => {
    return () => this.props.addToCart(item)
  }
  handleSortBy = name => {
    const { sortItems, items } = this.props
    return () => sortItems(sortBy(items, o => o[name]))
  }
  renderHead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th onClick={this.handleSortBy('title')}>Название</th>
          <th onClick={this.handleSortBy('totalPrice')}>Цена</th>
          <th onClick={this.handleSortBy('quantity')}>Кол-во</th>
        </tr>
      </thead>
    )
  }
  renderBody = () => {
    const { items, total } = this.props
    return (
      <tbody>
        {items.map((entity, num) => {
          const {
            disabledStatus,
            quantity,
            totalPrice,
            item: { title, price }
          } = entity

          const descriptionPrice = `${quantity}x${price}=${totalPrice}`
          return (
            <tr key={shortid.generate()}>
              <th>{num + 1}</th>
              <td>{title}</td>
              <td>{descriptionPrice}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  disabled={disabledStatus.remove}
                  onClick={this.handleRemoveClick(entity.item)}
                >
                  -
                </button>
                {quantity}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  disabled={disabledStatus.add}
                  onClick={this.handleAddClick(entity.item)}
                >
                  +
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    )
  }
  render() {
    const { total } = this.props
    if (!total.quantity) return <h1>Корзина пуста</h1>
    return [
      <h1 key={shortid.generate()}>Корзина:</h1>,
      <table key={shortid.generate()} className="table">
        {this.renderHead()}
        {this.renderBody()}
      </table>,
      <CartResume
        key={shortid.generate()}
        price={total.price}
        quantity={total.quantity}
      />,
      <button type="button" className="btn btn-warning">
        Купить
      </button>
    ]
  }
}
export default connect(
  state => ({
    items: itemsListSelector(state),
    total: totalSelector(state)
  }),
  { addToCart, removeFromCart, sortItems }
)(Cart)
