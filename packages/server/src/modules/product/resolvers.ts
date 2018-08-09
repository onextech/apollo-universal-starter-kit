/*eslint-disable no-unused-vars*/
import { Product } from './models'
import { withFilter } from 'graphql-subscriptions'
import { getNodes } from '../resolvers'

const PRODUCTS_SUBSCRIPTION = 'products_subscription'

export default (pubsub: any) => ({
  Query: {
    products: getNodes('Product'),
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
      return Product.query().patchAndFetchById(input.id, input)
    },
    deleteProduct: async (obj: Product, { input }: any, { Product }: any) => {
      const onDelete = await Product.query().deleteById(input.id)
      if (onDelete) return input
    },
  },
  Subscription: {
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
