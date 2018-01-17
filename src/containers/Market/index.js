import React, { Component } from 'react'
import shortid from 'shortid'
import { connect } from 'react-redux'
import { itemsListSelector, fetchItems, moduleName } from '../../ducks/market'
class Market extends Component {
  componentWillMount() {
    this.props.fetchItems()
  }

  render() {
    const { loading, items } = this.props
    if (loading) {
      return <h1>Loading...</h1>
    }
    return (
      <ul>
        {items.map(item => <li key={shortid.generate()}>{item.title}</li>)}
      </ul>
    )
  }
}
export default connect(
  state => ({
    loading: state[moduleName].loading,
    items: itemsListSelector(state)
  }),
  { fetchItems }
)(Market)
