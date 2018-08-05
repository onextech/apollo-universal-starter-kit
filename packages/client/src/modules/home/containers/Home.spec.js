import { expect } from 'chai'
import { step } from 'mocha-steps'
import Renderer from 'client/src/testHelpers/Renderer'
import Routes from 'client/src/app/Routes'

describe('Home UI works', () => {
  const renderer = new Renderer({})
  let app
  let content

  step('Home page renders on mount', () => {
    app = renderer.mount(Routes)
    renderer.history.push('/home')
    content = app.find('#content')
    expect(content).to.not.be.empty
  })
})
