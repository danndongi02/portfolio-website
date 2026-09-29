import { expect, test } from '@playwright/test';

test('home page loads with title and hero heading', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Ian Muigai/);
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});
