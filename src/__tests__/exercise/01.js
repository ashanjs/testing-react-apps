// simple test with ReactDOM
// http://localhost:3000/counter

import * as React from 'react'
import ReactDOM from 'react-dom'
import Counter from '../../components/counter'

beforeEach = () => document.body.innerHTML = ''

test('counter increments and decrements when the buttons are clicked', () => {

  const div = document.createElement('div')

  document.body.append(div)
  ReactDOM.render(<Counter />, div)

  const message = div.firstChild.querySelector('div')
  console.log(message.textContent)
  expect(message.textContent).toBe("Current count: 0")

  const [decrement, increment] = div.querySelectorAll('button')

  const incrementMouseClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0
  })
  increment.dispatchEvent(incrementMouseClickEvent)
  expect(message.textContent).toBe('Current count: 1')

  const decrementMouseClickEvent = new MouseEvent('click', {
    bubbles: true,
    cancelable: true,
    button: 0
  })

  decrement.dispatchEvent(decrementMouseClickEvent)
  expect(message.textContent).toBe('Current count: 0')

})

/* eslint no-unused-vars:0 */
