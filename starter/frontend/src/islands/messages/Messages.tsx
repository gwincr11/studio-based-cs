import { useEffect, useState, type FormEvent } from 'react'
import { addMessage, listMessages, type Message } from './api'

export function Messages() {
  const [messages, setMessages] = useState<Message[]>([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    listMessages()
      .then(result => { if (active) setMessages(result) })
      .catch((error: unknown) => {
        if (active) setError(error instanceof Error ? error.message : 'Could not load messages.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const message = await addMessage(text)
      setMessages(current => [message, ...current].slice(0, 50))
      setText('')
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Could not save the message.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <section aria-label="Message board">
      <form onSubmit={submit} className="flex flex-col gap-3">
        <label htmlFor="message" className="font-medium">Your message</label>
        <input
          id="message" required maxLength={200} value={text}
          onChange={event => setText(event.target.value)}
          className="rounded border border-stone-300 px-3 py-2"
        />
        <button
          type="submit" disabled={loading || saving || !text.trim()}
          className="self-start rounded bg-stone-800 px-5 py-2 text-white disabled:opacity-50"
        >{saving ? 'Saving...' : 'Add message'}</button>
      </form>
      {error && <p role="alert" className="mt-4 text-red-700">{error}</p>}
      {loading ? <p role="status" className="mt-4">Loading messages...</p> : (
        <ul aria-label="Messages" className="mt-6 space-y-3">
          {messages.map(message => (
            <li key={message.id} className="break-words rounded bg-white p-4">{message.text}</li>
          ))}
        </ul>
      )}
      {!loading && !error && messages.length === 0 && <p className="mt-4">No messages yet.</p>}
    </section>
  )
}
