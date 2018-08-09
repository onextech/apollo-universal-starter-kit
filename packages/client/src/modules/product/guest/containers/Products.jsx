import React from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
import update from 'immutability-helper'
import Products from '../components/Products'
import PRODUCTS_QUERY from '../../graphql/ProductsQuery.graphql'
import PRODUCTS_SUBSCRIPTION from '../../graphql/ProductsSubscription.graphql'
import paginationConfig from '../../../../../../../config/pagination'
import { PLATFORM } from '../../../../../../common/utils'

const limit =
  PLATFORM === 'web' || PLATFORM === 'server' ? paginationConfig.web.itemsNumber : paginationConfig.mobile.itemsNumber

export function AddProduct(prev, node) {
  // ignore if duplicate
  if (prev.products.edges.some((product) => node.id === product.cursor)) {
    return prev
  }

  const filteredProducts = prev.products.edges.filter((product) => product.node.id !== null)

  const edge = {
    cursor: node.id,
    node: node,
    __typename: 'ProductEdges',
  }

  return update(prev, {
    products: {
      totalCount: {
        $set: prev.products.totalCount + 1,
      },
      edges: {
        $set: [edge, ...filteredProducts],
      },
    },
  })
}

function DeleteProduct(prev, id) {
  const index = prev.products.edges.findIndex((x) => x.node.id === id)

  // ignore if not found
  if (index < 0) {
    return prev
  }

  return update(prev, {
    products: {
      totalCount: {
        $set: prev.products.totalCount - 1,
      },
      edges: {
        $splice: [[index, 1]],
      },
    },
  })
}

class ProductsContainer extends React.Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    products: PropTypes.object,
    subscribeToMore: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props)
    this.subscription = null
  }

  componentDidUpdate(prevProps) {
    if (!this.props.loading) {
      const endCursor = this.props.products ? this.props.products.pageInfo.endCursor : 0
      const prevEndCursor = prevProps.products ? prevProps.products.pageInfo.endCursor : null
      // Check if props have changed and, if necessary, stop the subscription
      if (this.subscription && prevEndCursor !== endCursor) {
        this.subscription()
        this.subscription = null
      }
      if (!this.subscription) {
        this.subscribeToProductList(endCursor)
      }
    }
  }

  componentWillUnmount() {
    if (this.subscription) {
      // unsubscribe
      this.subscription()
      this.subscription = null
    }
  }

  subscribeToProductList = (endCursor) => {
    const { subscribeToMore } = this.props
    this.subscription = subscribeToMore({
      document: PRODUCTS_SUBSCRIPTION,
      variables: { endCursor },
      updateQuery: (prev, {
        subscriptionData: {
          data: {
            productsUpdated: { mutation, node },
          },
        },
      }) => {
        let newResult = prev

        if (mutation === 'CREATED') {
          newResult = AddProduct(prev, node)
        } else if (mutation === 'DELETED') {
          newResult = DeleteProduct(prev, node.id)
        }

        return newResult
      },
    })
  };

  render() {
    return <Products {...this.props} />
  }
}

export default compose(
  graphql(PRODUCTS_QUERY, {
    options: () => {
      return {
        variables: { limit, after: 0 },
        fetchPolicy: 'cache-and-network',
      }
    },
    props: ({ data }) => {
      const { loading, error, products, fetchMore, subscribeToMore } = data
      const loadData = (after, dataDelivery) => {
        return fetchMore({
          variables: {
            after: after,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            const totalCount = fetchMoreResult.products.totalCount
            const newEdges = fetchMoreResult.products.edges
            const pageInfo = fetchMoreResult.products.pageInfo
            const displayedEdges = dataDelivery === 'add' ? [...previousResult.products.edges, ...newEdges] : newEdges

            return {
              // By returning `cursor` here, we update the `fetchMore` function
              // to the new cursor.
              products: {
                totalCount,
                edges: displayedEdges,
                pageInfo,
                __typename: 'Products',
              },
            }
          },
        })
      }
      if (error) throw new Error(error)
      return { loading, products, subscribeToMore, loadData }
    },
  }),
)(ProductsContainer)
