import React, { Component } from 'react'
import shortid from 'shortid'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { itemsListSelector, addToCart, sortItems } from '../../ducks/market'
import { moduleName } from '../../ducks/shop'
class Market extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    items: PropTypes.array.isRequired,
    addToCart: PropTypes.func.isRequired,
    sortItems: PropTypes.func.isRequired
  }

  handleOnClickRow = item => {
    const { addToCart } = this.props
    return () => addToCart(item)
  }
  handleSortBy = name => {
    const { sortItems } = this.props
    return () => sortItems(name)
  }
  renderHead = () => {
    return (
      <thead>
        <tr>
          <th>#</th>
          <th onClick={this.handleSortBy('title')}>Название</th>
          <th onClick={this.handleSortBy('price')}>Цена</th>
          <th onClick={this.handleSortBy('quantity')}>Кол-во</th>
          <th />
        </tr>
      </thead>
    )
  }
  renderBody = () => {
    const { items } = this.props
    return (
      <tbody>
        {items.map((item, num) => (
          <tr key={shortid.generate()}>
            <th>{num + 1}</th>
            <td>{item.title}</td>
            <td>{item.price}</td>
            <td>{item.quantity}</td>
            <td>
              <button
                type="button"
                disabled={item.quantity === 0}
                onClick={this.handleOnClickRow(item)}
                className="btn btn-info"
              >
                добавить в корзину
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    )
  }
  render() {
    return [
      <h1 key={shortid.generate()}>Товары:</h1>,
      <table key={shortid.generate()} className="table">
        {this.renderHead()}
        {this.renderBody()}
      </table>
    ]
  }
}
export default connect(
  state => ({
    items: itemsListSelector(state)
  }),
  { addToCart, sortItems }
)(Market)
