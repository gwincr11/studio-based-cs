import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: { baseURL: 'http://127.0.0.1:4317', viewport: { width: 1440, height: 1000 } },
  webServer: {
    command: 'npm run dev -- --port 4317 --strictPort',
    url: 'http://127.0.0.1:4317',
    reuseExistingServer: !process.env.CI,
  },
});
