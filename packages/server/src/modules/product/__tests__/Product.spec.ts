/*eslint-disable no-unused-vars*/
import chai from 'chai'
import { step } from 'mocha-steps'
import { getServer, getApollo } from '../../../../testHelpers/integrationSetup'

describe('Product API works', () => {
  let server: any
  let apollo: any

  before(() => {
    server = getServer()
    apollo = getApollo()
  })

  step('Has GraphQL Playground endpoint', () => {
    return chai
      .request(server)
      .get('/gplayground')
      .end((err, res) => {
        res.status.should.be(200)
        res.body.should.be('{}')
      })
  })
})
