import React from 'react'
import { graphql } from 'react-apollo'
import { AddProduct } from './Products'
import ProductCreate from '../components/ProductCreate'
import CREATE_PRODUCT from '../../graphql/CreateProduct.graphql'

class ProductCreateContainer extends React.Component {
  constructor(props) {
    super(props)
    this.subscription = null
  }

  render() {
    return <ProductCreate {...this.props} />
  }
}

export default graphql(CREATE_PRODUCT, {
  props: ({ ownProps: { history, navigation }, mutate }) => ({
    createProduct: async (product) => {
      const { title, description, image } = product
      let productData = await mutate({
        variables: { input: { title, description, image } },
        optimisticResponse: {
          __typename: 'Mutation',
          createProduct: {
            __typename: 'Product',
            id: null,
            title,
            description,
            comments: [],
          },
        },
        updateQueries: {
          products: (
            prev,
            {
              mutationResult: {
                data: { createProduct },
              },
            }
          ) => {
            return AddProduct(prev, createProduct)
          },
        },
      })

      if (history) {
        return history.push('/admin/products/' + productData.data.createProduct.id, {
          product: productData.data.createProduct,
        })
      } else if (navigation) {
        return navigation.navigate('Product', { id: productData.data.createProduct.id })
      }
    },
  }),
})(ProductCreateContainer)
