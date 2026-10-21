import { expect, test } from '@playwright/test'

test('a message survives a full browser refresh', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Studio Starter' })).toBeVisible()
  const message = `Workshop idea ${Date.now()}`
  await page.getByLabel('Your message').fill(message)
  await page.getByRole('button', { name: 'Add message' }).click()
  await expect(page.getByRole('listitem').filter({ hasText: message })).toBeVisible()
  await page.reload()
  await expect(page.getByRole('listitem').filter({ hasText: message })).toBeVisible()
})
