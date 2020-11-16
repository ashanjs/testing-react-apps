// testing custom hooks
// http://localhost:3000/counter-hook

import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from '../../components/use-counter'



test('exposes the count and increment/decrement functions', () => {
  let { result } = renderHook(useCounter)
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

})

test('allows customization of the initial count', () => {
  let { result } = renderHook(useCounter, { initialProps: { initialCount: 2 } })
  expect(result.current.count).toBe(2)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(2)

})

test('allows customization of the step', () => {
  let { result } = renderHook(useCounter, { initialProps: { step: 2 } })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)

})

/* eslint no-unused-vars:0 */
