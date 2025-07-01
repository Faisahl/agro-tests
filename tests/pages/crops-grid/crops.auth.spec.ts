import test from "@playwright/test";

test('sample auth test', async ({ page }) => {
  await page.goto('/');
})