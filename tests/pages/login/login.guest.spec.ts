import {test as should} from "@playwright/test";
import { test, expect } from "../../../fixtures/e2e/goto-login";
// import { LoginPage } from "../../../pages/login.page";
// import { NavBar } from "../../../pages/navbar.page";

const testUserEmail = process.env.AGRO_USER!;
const testPass = process.env.AGRO_USER_PASS!;
const testUserPhone = process.env.AGRO_USER_PHONE!;

should.describe('@smoke - valid/invalid user sign in', () => {
  test('tc_01 - login user with valid email credential', async ({ loginPage, page, navBar }) => {
    // const signin = new LoginPage(page);
    // await signin.goto();
    // const nav = new NavBar(page);
    await loginPage.signInUser(`${testUserEmail}`,testPass);
    await expect(page).toHaveURL('/');
    await expect(navBar.userIconBtn).toBeVisible();
  });

  test('tc_02 - login user with valid phone credential', async ({ loginPage, page, navBar }) => {
    // const signin = new LoginPage(page);
    // await signin.goto();
    // const nav = new NavBar(page);
    await loginPage.selectRadio('phone');
    await loginPage.signInUser(`${testUserPhone}`,testPass);
    await expect(page).toHaveURL('/');
    await expect(navBar.userIconBtn).toBeVisible();
  });

  test('tc_03 - show invalid email login error (wrong password)', async ({ loginPage, page, navBar }) => {
    // const signin = new LoginPage(page);
    // await signin.goto();
    await loginPage.signInUser(`${testUserEmail}`,'wrongpass');
    await expect(loginPage.loginError).toBeVisible();
  });
});

test('tc_04 - show invalid phone login error (wrong phone)', async ({ loginPage, page, navBar }) => {
  // const signin = new LoginPage(page);
  // await signin.goto();
  await loginPage.selectRadio('phone');
  await loginPage.signInUser('000010000',testPass);
  await expect(loginPage.loginError).toBeVisible();
});