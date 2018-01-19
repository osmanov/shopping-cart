import React from 'react'

const SuccessSend = ({ toMarket }) => (
  <div className="jumbotron jumbotron-fluid">
    <div className="container">
      <h1 className="display-3">Спасибо за покупку</h1>
      <p className="lead">наш менеджер свяжется с вами</p>
      <button type="button" className="btn btn-link" onClick={toMarket}>
        Вернуться к ветрине
      </button>
    </div>
  </div>
)
export default SuccessSend
