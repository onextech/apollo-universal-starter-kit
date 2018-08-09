import React from 'react'
import PropTypes from 'prop-types'
import { compose, graphql } from 'react-apollo'
import Product from '../components/Product'
import UPDATE_PRODUCT from '../../graphql/UpdateProduct.graphql'
import PRODUCT_QUERY from '../../graphql/ProductQuery.graphql'
import PRODUCT_SUBSCRIPTION from '../../graphql/ProductSubscription.graphql'

class ProductContainer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    product: PropTypes.object,
    subscribeToMore: PropTypes.func.isRequired,
    history: PropTypes.object,
    navigation: PropTypes.object,
  };

  constructor(props) {
    super(props)
    this.subscription = null
  }

  componentDidMount() {
    if (!this.props.loading) {
      this.initProductContainerSubscription()
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.loading) {
      let prevProductId = prevProps.product ? prevProps.product.id : null
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevProductId !== this.props.product.id) {
        this.subscription()
        this.subscription = null
      }
      this.initProductContainerSubscription()
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription()
      this.subscription = null
    }
  }

  initProductContainerSubscription() {
    if (!this.subscription && this.props.product) {
      this.subscribeToProductContainer(this.props.product.id)
    }
  }

  subscribeToProductContainer = (productId) => {
    const { subscribeToMore, history, navigation } = this.props

    this.subscription = subscribeToMore({
      document: PRODUCT_SUBSCRIPTION,
      variables: { id: productId },
      updateQuery: (prev, { subscriptionData: { data: { productUpdated: { mutation } } } }) => {
        if (mutation === 'DELETED') {
          if (history) {
            return history.push('/admin/products')
          } else if (navigation) {
            return navigation.goBack()
          }
        }
        return prev
      },
    })
  };

  render() {
    return <Product {...this.props} />
  }
}

export default compose(
  graphql(PRODUCT_QUERY, {
    options: (props) => {
      let id = 0
      if (props.match) {
        id = props.match.params.id
      } else if (props.navigation) {
        id = props.navigation.state.params.id
      }

      return {
        variables: { id },
      }
    },
    props({ data: { loading, error, product, subscribeToMore } }) {
      if (error) throw new Error(error)
      return { loading, product, subscribeToMore }
    },
  }),
  graphql(UPDATE_PRODUCT, {
    props: ({ ownProps: { history, navigation }, mutate }) => ({
      updateProduct: async (product) => {
        const { id, title, description, image } = product
        await mutate({
          variables: { input: { id, title, description, image } },
        })
        if (history) {
          return history.push('/admin/products')
        }
        if (navigation) {
          return navigation.navigate('Products')
        }
      },
    }),
  })
)(ProductContainer)
