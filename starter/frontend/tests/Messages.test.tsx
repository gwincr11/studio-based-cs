import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import { Messages } from '../src/islands/messages/Messages'

afterEach(() => vi.unstubAllGlobals())

test('loads saved messages and posts a new message to Flask', async () => {
  const fetchMock = vi.fn()
    .mockResolvedValueOnce(new Response(JSON.stringify([{ id: 1, text: 'Already saved' }])))
    .mockResolvedValueOnce(new Response(JSON.stringify({ id: 2, text: 'Our idea' }), { status: 201 }))
  vi.stubGlobal('fetch', fetchMock)
  render(<Messages />)
  expect(await screen.findByText('Already saved')).toBeInTheDocument()
  fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Our idea' } })
  fireEvent.click(screen.getByRole('button', { name: 'Add message' }))
  expect(await screen.findByText('Our idea')).toBeInTheDocument()
  expect(fetchMock).toHaveBeenLastCalledWith('/api/messages', expect.objectContaining({
    method: 'POST', body: JSON.stringify({ text: 'Our idea' }),
  }))
  expect(screen.getByLabelText('Your message')).toHaveValue('')
})

test('shows server failures and keeps unsaved input', async () => {
  vi.stubGlobal('fetch', vi.fn()
    .mockResolvedValueOnce(new Response('[]'))
    .mockResolvedValueOnce(new Response(JSON.stringify({ error: 'Could not save.' }), { status: 500 })))
  render(<Messages />)
  await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument())
  fireEvent.change(screen.getByLabelText('Your message'), { target: { value: 'Keep this' } })
  fireEvent.click(screen.getByRole('button', { name: 'Add message' }))
  expect(await screen.findByRole('alert')).toHaveTextContent('Could not save.')
  expect(screen.getByLabelText('Your message')).toHaveValue('Keep this')
})
