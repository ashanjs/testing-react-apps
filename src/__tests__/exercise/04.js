// form testing
// http://localhost:3000/login

import * as React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'
import faker from 'faker'

function buildLoginForm(overrides) {
  return ({
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides
  })
}

test('submitting the form calls onSubmit with username and password', () => {

  const handleSubmit = jest.fn()
  render(<Login onSubmit={handleSubmit} />)

  const { username, password } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/Username/i), username)
  userEvent.type(screen.getByLabelText(/Password/i), password)

  userEvent.click(screen.getByRole('button', { name: /Submit/i }))

  expect(handleSubmit).toHaveBeenCalledWith(
    {
      username,
      password
    })
})

/*
eslint
  no-unused-vars: "off",
*/
