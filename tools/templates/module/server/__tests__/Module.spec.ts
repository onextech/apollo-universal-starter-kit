/* tslint:disable:no-implicit-dependencies */
import { expect } from 'chai'
import { getServer, getApollo } from '../../../testHelpers/integrationSetup'
import { $Module$ } from '../models'

const mock$Module$ = {
  title: 'My $Module$ 1',
}

const mock$Module$2 = {
  title: 'My $Module$ 2',
}

describe('$Module$ CRUD works', () => {
  let $module$: $Module$

  it('Should have tableName', () => {
    expect($Module$.tableName).to.equal('$module$s')
  })

  it('Should create', async () => {
    const onCreate = await $Module$.query().insert(mock$Module$)
    const onFetch = await $Module$.query().findById((onCreate.id))
    $module$ = onFetch
    expect(onCreate.id).to.be.equal(onFetch.id)
  })

  it('Should read', async () => {
    const onFetch = await $Module$.query().findById($module$.id)
    expect(onFetch.id).to.be.equal($module$.id)
  })

  it('should update', async () => {
    const onUpdate = await $Module$.query().patchAndFetchById($module$.id, mock$Module$2)
    expect(onUpdate.updatedAt).to.not.be.equal($module$.updatedAt)
  })

  it('Should delete', async () => {
    const onDelete = await $Module$.query().deleteById($module$.id)
    expect(onDelete).to.be.equal(1)
  })
})

describe('$Module$ API works', () => {
  let server: any
  let apollo: any

  before(() => {
    server = getServer()
    apollo = getApollo()
  })
})
