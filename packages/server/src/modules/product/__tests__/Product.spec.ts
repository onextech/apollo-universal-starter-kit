import { expect } from 'chai'
import { getServer, getApollo } from '../../../testHelpers/integrationSetup'
import { Product } from '../models'

import GET_PRODUCTS from '../../../../../client/src/modules/product/graphql/GetProducts.graphql'
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

  before(() => {
    server = getServer()
    apollo = getApollo()
  })

  it('Should create via mutation', async () => {
    const onMutate = await apollo.mutate({
      mutation: CREATE_PRODUCT,
      variables: { input: mockProduct },
    })
    const { data: { createProduct } } = onMutate
    product = createProduct
    expect(product).to.have.property('createdAt')
  })

  it('Should list via query', async () => {
    const onQuery = await apollo.query({ query: GET_PRODUCTS })
    const { data: { products } } = onQuery
    expect(products[0]).to.deep.equal(product)
  })

  it('Should update via mutation', async () => {
    const onUpdate = await apollo.mutate({
      mutation: UPDATE_PRODUCT,
      variables: { input: { id: product.id, ...mockProduct2 } },
    })
    const { data: { updateProduct } } = onUpdate
    expect(updateProduct).to.have.property('id', product.id)
    expect(updateProduct).to.have.property('title', mockProduct2.title)
    product = updateProduct
  })

  it('Should delete via mutation', async () => {
    const onDelete = await apollo.mutate({
      mutation: DELETE_PRODUCT,
      variables: { input: { id: product.id } },
    })
    const { data: { deleteProduct } } = onDelete
    expect(deleteProduct.id).to.equal(product.id)
  })
})
