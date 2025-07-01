import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { HomePage } from "../pages/home.page";
import path from "path";

const authFile = path.join(__dirname, '../testing/pwt/.auth/user.json');

setup('authenticate', async ({ page }) => {
    const signin = new LoginPage(page);
    await signin.goto();
    await signin.signInUser('admin@kashtdar.com','d8T2[W0[4c-a');
    await expect(page).toHaveURL('/');
    const home = new HomePage(page);
    await expect(home.userIcon).toBeVisible();
    await page.context().storageState({ path: authFile })
})