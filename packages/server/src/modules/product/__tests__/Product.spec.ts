import { expect } from 'chai'
import { getServer, getApollo } from '../../../testHelpers/integrationSetup'
import { Product } from '../models'
import PRODUCT_QUERY from '../../../../../client/src/modules/product/graphql/ProductQuery.graphql'
import PRODUCTS_QUERY from '../../../../../client/src/modules/product/graphql/ProductsQuery.graphql'
import PRODUCT_SUBSCRIPTION from '../../../../../client/src/modules/product/graphql/ProductSubscription.graphql'
import PRODUCTS_SUBSCRIPTION from '../../../../../client/src/modules/product/graphql/ProductsSubscription.graphql'
import CREATE_PRODUCT from '../../../../../client/src/modules/product/graphql/CreateProduct.graphql'
import UPDATE_PRODUCT from '../../../../../client/src/modules/product/graphql/UpdateProduct.graphql'
import DELETE_PRODUCT from '../../../../../client/src/modules/product/graphql/DeleteProduct.graphql'

const mockProduct = {
  title: 'My Product 1',
}

const mockProduct2 = {
  title: 'My Product 2',
}

describe('Product CRUD works', () => {
  let product: Product

  it('Should have tableName', () => {
    expect(Product.tableName).to.equal('products')
  })

  it('Should create', async () => {
    const onCreate = await Product.query().insert(mockProduct)
    const onFetch = await Product.query().findById((onCreate.id))
    product = onFetch
    expect(onCreate.id).to.be.equal(onFetch.id)
  })

  it('Should read', async () => {
    const onFetch = await Product.query().findById(product.id)
    expect(onFetch.id).to.be.equal(product.id)
  })

  it('Should update', async () => {
    const onUpdate = await Product.query().patchAndFetchById(product.id, mockProduct2)
    expect(onUpdate.updatedAt).to.not.be.equal(product.updatedAt)
  })

  it('Should delete', async () => {
    const onDelete = await Product.query().deleteById(product.id)
    expect(onDelete).to.be.equal(1)
  })
})

describe('Product API works', () => {
  let server: any
  let apollo: any
  let product: Product
  let subscription: any

  before(() => {
    server = getServer()
    apollo = getApollo()
  })

  it('Should create', async () => {
    const onCreate = await apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: mockProduct },
    })
    const { data: { createProduct } } = onCreate
    product = createProduct
    expect(product).to.have.property('createdAt')
  })

  it('Should get', async () => {
    const onQuery = await apollo.query({
      query: PRODUCT_QUERY,
      variables: { id: product.id },
    })
    const { data: { product: fetchedProduct } } = onQuery
    expect(fetchedProduct).to.deep.equal(product)
  })

  it('Should list', async () => {
    const onQuery = await apollo.query({
      query: PRODUCTS_QUERY,
      variables: { limit: 10, after: 0 },
    })
    const { data: { products: { edges } } } = onQuery
    const fetchedProduct = edges[0].node
    expect(fetchedProduct).to.deep.equal(product)
  })

  it('Should update', async () => {
    const onUpdate = await apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { input: { id: product.id, ...mockProduct2 } },
    })
    const { data: { updateProduct } } = onUpdate
    expect(updateProduct).to.have.property('id', product.id)
    expect(updateProduct).to.have.property('title', mockProduct2.title)
    product = updateProduct
  })

  it('Should delete', async () => {
    const onDelete = await apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: { input: { id: product.id } },
    })
    const { data: { deleteProduct } } = onDelete
    expect(deleteProduct.id).to.equal(product.id)
  })

  it('Should pubsub on create', (done) => {
    apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: mockProduct },
    })

    subscription = apollo
      .subscribe({
        query: PRODUCTS_SUBSCRIPTION,
        variables: { endCursor: 1 },
      })
      .subscribe({
        next: (data: any) => {
          const { data: { productsUpdated } } = data
          expect(productsUpdated.mutation).to.equal('CREATED')
          expect(productsUpdated.node.title).to.equal(mockProduct.title)
          product = productsUpdated.node
          subscription.unsubscribe()
          expect(subscription).to.have.property('_state', 'closed')
          done()
        },
      })

    expect(subscription).to.have.property('_state', 'ready')
    expect(subscription._observer).to.have.property('next')
  })

  it('Should pubsub on update', (done) => {
    const { id } = product

    apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { input: { id, ...mockProduct2 } },
    })

    subscription = apollo
      .subscribe({
        query: PRODUCT_SUBSCRIPTION,
        variables: { id },
      })
      .subscribe({
        next: (data: any) => {
          const { data: { productUpdated } } = data
          expect(productUpdated.mutation).to.equal('UPDATED')
          expect(productUpdated.node.title).to.equal(mockProduct2.title)
          product = productUpdated.node
          subscription.unsubscribe()
          expect(subscription).to.have.property('_state', 'closed')
          done()
        },
      })

    expect(subscription).to.have.property('_state', 'ready')
    expect(subscription._observer).to.have.property('next')
  })

  it('Should pubsub on delete', (done) => {
    const { id } = product

    apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: { input: { id } },
    })

    subscription = apollo
      .subscribe({
        query: PRODUCTS_SUBSCRIPTION,
        variables: { endCursor: 1 },
      })
      .subscribe({
        next: (data: any) => {
          const { data: { productsUpdated } } = data
          expect(productsUpdated.mutation).to.equal('DELETED')
          expect(productsUpdated.node.id).to.equal(id)
          subscription.unsubscribe()
          expect(subscription).to.have.property('_state', 'closed')
          done()
        },
      })

    expect(subscription).to.have.property('_state', 'ready')
    expect(subscription._observer).to.have.property('next')
  })
})
