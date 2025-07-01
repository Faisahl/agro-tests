import test, { expect } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { NavBar } from "../../pages/navbar.page";

test('valid user login by email', async ({ page }) => {
  await page.goto('/');
  const nav = new NavBar(page);
  const signin = new LoginPage(page);
  await nav.loginBtn.click();
  await signin.signInUser('admin@kashtdar.com','d8T2[W0[4c-a');
  await expect(nav.userIconBtn).toBeVisible();
});

test('invalid user login by email', async ({ page }) => {
  await page.goto('/');
  const nav = new NavBar(page);
  const signin = new LoginPage(page);
  await nav.loginBtn.click();
  await signin.signInUser('admin@krashtkar.com','d8T2[W0[4c-a');
  await expect(signin.loginError).toBeVisible();
});

test('valid user login by phone no.', async ({ page }) => {
  await page.goto('/');
  const nav = new NavBar(page);
  const signin = new LoginPage(page);
  await nav.loginBtn.click();
  await signin.selectRadio('phone');
  await signin.signInUser('3132134132','d8T2[W0[4c-a');
  await expect(nav.userIconBtn).toBeVisible();
});

test('invalid user login by phone no.', async ({ page }) => {
  await page.goto('/');
  const nav = new NavBar(page);
  const signin = new LoginPage(page);
  await nav.loginBtn.click();
  await signin.signInUser('3132134134','d8T2[W0[4c-a');
  await expect(signin.loginError).toBeVisible();
});