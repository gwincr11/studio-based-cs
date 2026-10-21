import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  reporter: 'list',
  use: { baseURL: 'http://127.0.0.1:5001' },
  webServer: {
    command: 'npm --prefix frontend run build && PYTHONPATH=src .venv/bin/python e2e/server.py',
    url: 'http://127.0.0.1:5001',
    reuseExistingServer: false,
  },
})
