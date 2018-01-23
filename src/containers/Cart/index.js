import React, { Fragment, Component } from 'react'
import sortBy from 'lodash.sortby'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CartResume from '../../components/CartResume'
import { sort } from '../../utils'
import {
  itemsListSelector,
  totalSelector,
  sortItems,
  sendPurchase
} from '../../ducks/cart'
import { removeFromCart, addToCart } from '../../ducks/market'
class Cart extends Component {
  static propTypes = {
    items: PropTypes.array.isRequired,
    total: PropTypes.object.isRequired,
    sendPurchase: PropTypes.func.isRequired,
    sortItems: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    addToCart: PropTypes.func.isRequired
  }
  handleRemoveClick = item => {
    return () => this.props.removeFromCart(item)
  }
  handleAddClick = item => {
    return () => this.props.addToCart(item)
  }
  handleSortBy = name => {
    const { sortItems, items } = this.props
    console.log(items)
    return () => sortItems({ name, items })
  }
  handleSendClick = () => {
    const { sendPurchase, items } = this.props
    return () =>
      sendPurchase(
        items.map(({ id, title, quantity, totalPrice }) => ({
          id,
          title,
          quantity,
          totalPrice
        }))
      )
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
    const { items } = this.props
    return (
      <tbody>
        {items.map((entity, num) => {
          const {
            disabledStatus,
            quantity,
            totalPrice,
            item: { title, price, id }
          } = entity

          const descriptionPrice = `${quantity}x${price}=${totalPrice}`
          return (
            <tr key={id}>
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

    return (
      <Fragment>
        <h1>Корзина:</h1>
        <table className="table">
          {this.renderHead()}
          {this.renderBody()}
        </table>
        <CartResume price={total.price} quantity={total.quantity} />
        <button
          type="button"
          className="btn btn-warning"
          onClick={this.handleSendClick()}
        >
          Купить
        </button>
      </Fragment>
    )
  }
}
export default connect(
  state => ({
    items: itemsListSelector(state),
    total: totalSelector(state)
  }),
  { addToCart, removeFromCart, sortItems, sendPurchase }
)(Cart)
