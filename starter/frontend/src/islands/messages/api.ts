export interface Message {
  id: number
  text: string
}

function isMessage(value: unknown): value is Message {
  return typeof value === 'object' && value !== null &&
    'id' in value && typeof value.id === 'number' &&
    'text' in value && typeof value.text === 'string'
}

async function readResponse(response: Response): Promise<unknown> {
  const payload: unknown = await response.json()
  if (!response.ok) {
    const message = typeof payload === 'object' && payload !== null &&
      'error' in payload && typeof payload.error === 'string'
      ? payload.error : `Request failed (${response.status}).`
    throw new Error(message)
  }
  return payload
}

export async function listMessages(): Promise<Message[]> {
  const payload = await readResponse(await fetch('/api/messages'))
  if (!Array.isArray(payload) || !payload.every(isMessage)) {
    throw new Error('The server returned an invalid message list.')
  }
  return payload
}

export async function addMessage(text: string): Promise<Message> {
  const payload = await readResponse(await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  }))
  if (!isMessage(payload)) throw new Error('The server returned an invalid message.')
  return payload
}
