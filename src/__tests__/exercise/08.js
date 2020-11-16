// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import { render, act } from '@testing-library/react'
import useCounter from '../../components/use-counter'

function setup({ initialProps } = {}) {
  let result = {}
  function TestComponent(props) {
    result.current = useCounter(props)
    return null
  }
  render(<TestComponent {...initialProps} />)
  return result
}


test('exposes the count and increment/decrement functions', () => {
  let result = setup()
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

})

test('allows customization of the initial count', () => {
  let result = setup({ initialProps: { initialCount: 2 } })
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)

})

test('allows customization of the step', () => {
  let result = setup({ initialProps: { step: 2 } })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

})

/* eslint no-unused-vars:0 */
