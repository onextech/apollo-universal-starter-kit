import { expect } from 'chai'
import { step } from 'mocha-steps'
import Renderer from '../../../../src/testHelpers/Renderer'
import { updateContent } from '../../../testHelpers/testUtils'

describe('Home UI works', () => {
  const renderer = new Renderer({})
  let app
  let content

  step('Home page renders on mount', () => {
    app = renderer.mount()
    renderer.history.push('/')
    content = updateContent(app.container)
    expect(content).to.not.be.empty
  })
})
