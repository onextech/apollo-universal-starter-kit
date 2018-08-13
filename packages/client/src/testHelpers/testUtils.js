import { prettyDOM } from 'dom-testing-library'
import { render, renderIntoDocument, fireEvent, wait, waitForElement, cleanup } from 'react-testing-library'

const find = (container, selector) => {
  return container.querySelector(selector)
}

const findAll = (container, selector) => {
  return container.querySelectorAll(selector)
}

const isElementExist = (container, selector) => {
  const element = find(container, selector)
  if (!element) {
    throw new Error(`Unable to find element by selector: ${selector}. Container: \n${prettyDOM(container)}`)
  }
  return element
}

const waitForElementRender = async (container, selector) => {
  let element = null
  await wait(() => {
    element = isElementExist(container, selector)
  })
  return element
}

const click = (element) => {
  fireEvent.click(element)
}

const change = (element, value) => {
  fireEvent.change(element, value)
}

const submit = (element) => {
  fireEvent.submit(element)
}

const updateContent = (container) => {
  return find(container, '#content')
}

export {
  render,
  renderIntoDocument,
  prettyDOM,
  wait,
  waitForElement,
  waitForElementRender,
  fireEvent,
  cleanup,
  find,
  isElementExist,
  findAll,
  updateContent,
  click,
  change,
  submit,
}
