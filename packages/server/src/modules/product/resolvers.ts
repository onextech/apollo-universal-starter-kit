/*eslint-disable no-unused-vars*/
import { Product } from './models'

export default (pubsub: any) => ({
  Query: {
    products: async (obj: Product, { input }: any, { Product }: any) => {
      return Product.query()
    },
  },
  Mutation: {
    createProduct: async (obj: Product, { input }: any, { Product }: any) => {
      return Product.query().insert(input)
    },
    updateProduct: async (obj: Product, { input }: any, { Product }: any) => {
      return Product.query().patchAndFetchById(input.id, input)
    },
    deleteProduct: async (obj: Product, { input }: any, { Product }: any) => {
      const onDelete = await Product.query().deleteById(input.id)
      if (onDelete) return input
    },
  },
  Subscription: {},
})
