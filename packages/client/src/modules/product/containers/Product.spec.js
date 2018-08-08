import { expect } from 'chai'
import { step } from 'mocha-steps'
import Renderer from '../../../testHelpers/Renderer'
import { updateContent } from '../../../testHelpers/testUtils'

describe('Product UI works', () => {
  const renderer = new Renderer({})
  let app
  let content

  step('Product page renders on mount', () => {
    app = renderer.mount()
    renderer.history.push('/product')
    content = updateContent(app.container)
    expect(content).to.not.be.empty
  })
})
