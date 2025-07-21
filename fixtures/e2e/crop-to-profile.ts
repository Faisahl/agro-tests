import { test as base, expect, Page } from "@playwright/test";
import { LoginPage } from "../../pages/login.page";
import { NavBar } from "../../pages/navbar.page";
import { CropsGridPage } from "../../pages/crops.page";
import { UserProfilePage } from "../../pages/user-profile.page";

type AuthFixtures = {
  authenticated: Page;
  navBar: NavBar;
  cropGrid: CropsGridPage;
  userProfile: UserProfilePage;
}

export const test = base.extend<AuthFixtures>({
  authenticated: async ({ page }, use) => {
    const signin = new LoginPage(page);
    const nav: NavBar = new NavBar(page);
    await signin.goto();
    await signin.signInUser("admin@kashtdar.com", "d8T2[W0[4c-a");
    await expect(page).toHaveURL("/");

    await use(page);

    await nav.logout();
  },
  navBar: async ({ page }, use) => {
    await use(new NavBar(page));
  },
  cropGrid: async ({ page }, use) => {
    await use(new CropsGridPage(page));
  },
  userProfile: async ({ page }, use) => {
    await use(new UserProfilePage(page));
  },
});

export { expect } from '@playwright/test';