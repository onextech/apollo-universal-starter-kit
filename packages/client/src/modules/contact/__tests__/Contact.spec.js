import { expect } from 'chai'
import { step } from 'mocha-steps'

import Renderer from '../../../../src/testHelpers/Renderer'
import { find, change, submit, updateContent } from '../../../testHelpers/testUtils'

describe('Contact UI works', () => {
  const renderer = new Renderer({})
  let app
  let content

  step('Contact page renders on mount', () => {
    app = renderer.mount()
    renderer.history.push('/contact')
    content = updateContent(app.container)
    expect(content).to.not.be.empty
  })

  step('Should submit', () => {
    const { container } = app

    const form = find(container, '[name="contact"]')
    const name = find(form, '[name="name"]')
    const email = find(form, '[name="email"]')
    const content = find(form, '[name="content"]')

    change(name, { target: { value: 'my name' } })
    change(email, { target: { value: 'myemail@email.com' } })
    change(content, { target: { value: 'my test content' } })

    submit(form)
  })
})
