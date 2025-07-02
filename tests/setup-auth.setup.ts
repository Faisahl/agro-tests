import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import path from "path";
import { NavBar } from "../pages/navbar.page";

const authFile = path.join(__dirname, '../pwt/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const signin = new LoginPage(page);
    await signin.goto();
    await signin.signInUser('admin@kashtdar.com','d8T2[W0[4c-a');
    await expect(page).toHaveURL('/');
    const nav = new NavBar(page);
    await expect(nav.userIconBtn).toBeVisible();
    await page.context().storageState({ path: authFile })
})