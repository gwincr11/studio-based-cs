import './styles/globals.css'
import { mount } from './islands/messages'

document.querySelectorAll<HTMLElement>('[data-island="messages"]').forEach(mount)
