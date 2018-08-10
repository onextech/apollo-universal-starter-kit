import React from 'react'
import Checkout from '../components/Checkout'

class CheckoutContainer extends React.Component {
  render() {
    return (
      <Checkout {...this.props} />
    )
  }
}

export default CheckoutContainer
