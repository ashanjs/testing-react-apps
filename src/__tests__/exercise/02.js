// simple test with React Testing Library
// http://localhost:3000/counter

import * as React from 'react'
import Counter from '../../components/counter'
import { render, fireEvent } from '@testing-library/react'

test('counter increments and decrements when the buttons are clicked', () => {
  const { container } = render(<Counter />)

  const message = container.firstChild.querySelector('div')
  expect(message).toHaveTextContent('Current count: 0')

  const [decrement, increment] = container.querySelectorAll('button')

  fireEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
