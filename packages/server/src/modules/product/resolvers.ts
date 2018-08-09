import { Product } from './models'
import { withFilter } from 'graphql-subscriptions'
import { getNodes, getNode } from '../resolvers'

const PRODUCTS_SUBSCRIPTION = 'products_subscription'
const PRODUCT_SUBSCRIPTION = 'product_subscription'

export default (pubsub: any) => ({
  Query: {
    products: getNodes('Product'),
    product: getNode('Product'),
  },
  Mutation: {
    createProduct: async (obj: Product, { input }: any, { Product }: any) => {
      const product = await Product.query().insert(input)
      pubsub.publish(PRODUCTS_SUBSCRIPTION, {
        productsUpdated: {
          id: product.id,
          mutation: 'CREATED',
          node: product,
        },
      })
      return product
    },
    updateProduct: async (obj: Product, { input }: any, { Product }: any) => {
      const product = await Product.query().patchAndFetchById(input.id, input)
      pubsub.publish(PRODUCTS_SUBSCRIPTION, {
        productsUpdated: {
          id: product.id,
          mutation: 'UPDATED',
          node: product,
        },
      })
      pubsub.publish(PRODUCT_SUBSCRIPTION, {
        productUpdated: {
          id: product.id,
          mutation: 'UPDATED',
          node: product,
        },
      })
      return product
    },
    deleteProduct: async (obj: Product, { input }: any, { Product }: any) => {
      const { id } = input
      const product = await Product.query().findById(id)
      const onDelete = await Product.query().deleteById(id)
      if (onDelete) {
        pubsub.publish(PRODUCTS_SUBSCRIPTION, {
          productsUpdated: {
            id,
            mutation: 'DELETED',
            node: product,
          },
        })
        pubsub.publish(PRODUCT_SUBSCRIPTION, {
          productUpdated: {
            id,
            mutation: 'DELETED',
            node: product,
          },
        })
        return product
      }
    },
  },
  Subscription: {
    productUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(PRODUCT_SUBSCRIPTION),
        (payload, variables) => {
          return payload.productUpdated.id === variables.id
        },
      ),
    },
    productsUpdated: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(PRODUCTS_SUBSCRIPTION),
        (payload, variables) => {
          return variables.endCursor <= payload.productsUpdated.id
        },
      ),
    },
  },
})
