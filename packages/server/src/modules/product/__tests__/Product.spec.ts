import { expect } from 'chai'
import { getServer, getApollo } from '../../../testHelpers/integrationSetup'
import { Product } from '../models'

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

  it('should update', async () => {
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

  before(() => {
    server = getServer()
    apollo = getApollo()
  })
})
