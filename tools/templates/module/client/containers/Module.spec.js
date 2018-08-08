import { expect } from 'chai'
import { step } from 'mocha-steps'
import Renderer from '../../../../client/testHelpers/Renderer'
import { updateContent } from '../../../../packages/client/src/testHelpers/testUtils'

describe('$Module$ UI works', () => {
  const renderer = new Renderer({})
  let app
  let content

  step('$Module$ page renders on mount', () => {
    app = renderer.mount()
    renderer.history.push('/$module$')
    content = updateContent(app.container)
    expect(content).to.not.be.empty
  })
})
