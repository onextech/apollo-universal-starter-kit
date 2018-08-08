/*eslint-disable no-unused-vars*/
import React from 'react'
import { graphql, compose } from 'react-apollo'
import ProductView from '../components/ProductView'

class Product extends React.Component {
  render() {
    return (
      <ProductView {...this.props} />
    )
  }
}

const ProductWithApollo = compose()(Product)

export default ProductWithApollo
