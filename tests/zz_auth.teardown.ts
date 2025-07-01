import test, { expect } from "@playwright/test";
import { NavBar } from "../pages/navbar.page";

test('teardown auth state', async ({ page }) => {
  await page.goto('/');
  const nav: NavBar = new NavBar(page);
  await expect(nav.userIconBtn).toBeVisible();
  await nav.openUserDD();
  await nav.logoutBtn.click();
  await expect(page).toHaveURL('/');
  expect(nav.loginBtn).toBeTruthy();
});