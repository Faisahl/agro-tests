import { test as base } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { NavBar } from "../../pages/navbar.page";

type LoginFixtures = {
  loginPage: LoginPage;
  navBar: NavBar;
}

export const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto('/');
    const nav = new NavBar(page);
    const signin = new LoginPage(page);
    await nav.signInBtn.click();

    await use(signin);
  },

  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  }
});

export { expect } from '@playwright/test';