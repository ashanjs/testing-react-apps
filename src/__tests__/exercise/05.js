// mocking HTTP requests
// http://localhost:3000/login-submission

import * as React from 'react'
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { build, fake } from '@jackfranklin/test-data-bot'
import { setupServer } from 'msw/node'
import { rest } from 'msw'
import Login from '../../components/login-submission'
import { handlers } from 'test/server-handlers.js'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})

const server = setupServer(...handlers)
beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

test(`logging in displays the user's username`, async () => {
  render(<Login />)
  const { username, password } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByText(username)).toBeInTheDocument()
})

test(`username is not provided`, async () => {
  render(<Login />)
  const { password } = buildLoginForm()

  //userEvent.type(screen.getByLabelText(/username/i), username)
  //username is not provided
  userEvent.type(screen.getByLabelText(/password/i), password)
  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"username required"`,
  )
})

test(`password is not provided`, async () => {
  render(<Login />)
  const { username } = buildLoginForm()

  userEvent.type(screen.getByLabelText(/username/i), username)
  //userEvent.type(screen.getByLabelText(/password/i), password)
  //password is not provided
  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))
  expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
    `"password required"`,
  )
})

test(`something bad`, async () => {
  const errorMessage = "Something is bad"
  server.use(
    rest.post(
      'https://auth-provider.example.com/api/login',
      async (req, res, cxt) => {
        return res(cxt.status(500), cxt.json({ message: errorMessage }))
      },
    ),
  )
  render(<Login />)

  userEvent.click(screen.getByRole('button', { name: /submit/i }))

  await waitForElementToBeRemoved(() => screen.getByLabelText(/loading/i))

  expect(screen.getByRole('alert')).toHaveTextContent(errorMessage)
})
