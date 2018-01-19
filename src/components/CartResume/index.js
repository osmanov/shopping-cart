import React from 'react'
import PropTypes from 'prop-types'

const CartResume = ({ price, quantity }) => (
  <div>
    <div>------------------------------------------------</div>
    Итого в корзине товаров: {quantity} шт.
    <div>на сумму:{price}</div>
  </div>
)
CartResume.propTypes = {
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired
}
export default CartResume
