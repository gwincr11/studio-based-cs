import { createRoot } from 'react-dom/client'
import { Messages } from './Messages'

export function mount(element: HTMLElement): void {
  createRoot(element).render(<Messages />)
}
