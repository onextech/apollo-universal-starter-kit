import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { Redirect } from 'react-router-dom'
import { PageLayout } from '../../common/components/web'

const renderMetaData = () => {
  return (
    <Helmet
      title='Checkout'
      meta={[
        { name: 'description', content: 'Checkout page' },
      ]}
    />
  )
}

const Checkout = ({ location }) => {
  const { state } = location
  if (state) {
    const { cart, order } = state
    console.log('cart', cart)
    console.log('order', order)
    return (
      <PageLayout container>
        {renderMetaData()}
        <h1>Checkout</h1>
        <p>Please fill in the following fields</p>
      </PageLayout>
    )
  }
  return (
    <Redirect to={{ pathname: '/products' }} />
  )
}

Checkout.propTypes = {
  location: PropTypes.object.isRequired,
}

export default Checkout
