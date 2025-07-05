import { test, expect } from "../../fixtures/e2e/fixture-login";

test.describe('valid login e2e tests', () => {
  test('valid user login by email - tce_01', async ({ loginPage, page, navBar }) => {
    // await page.goto('/');
    // const nav = new NavBar(page);
    // const signin = new LoginPage(page);
    // await nav.loginBtn.click();
    await loginPage.signInUser('admin@kashtdar.com','d8T2[W0[4c-a');
    await expect(navBar.userIconBtn).toBeVisible();
  });
  
  test('valid user login by phone no. - tce_02', async ({ loginPage, page, navBar }) => {
    // await page.goto('/');
    // const nav = new NavBar(page);
    // const signin = new LoginPage(page);
    // await nav.loginBtn.click();
    await loginPage.selectRadio('phone');
    await loginPage.signInUser('3132134132','d8T2[W0[4c-a');
    await expect(navBar.userIconBtn).toBeVisible();
  });
});

test.describe('invalid login e2e tests', () => {
  test('invalid user login by email - tce_03', async ({ loginPage, page }) => {
    // await page.goto('/');
    // const nav = new NavBar(page);
    // const signin = new LoginPage(page);
    // await nav.loginBtn.click();
    await loginPage.signInUser('admin@krashtkar.com','d8T2[W0[4c-a');
    await expect(loginPage.loginError).toBeVisible();
  });
  
  test('invalid user login by phone no. - tce_04', async ({ loginPage, page }) => {
    // await page.goto('/');
    // const nav = new NavBar(page);
    // const signin = new LoginPage(page);
    // await nav.loginBtn.click();
    await loginPage.signInUser('3132134134','d8T2[W0[4c-a');
    await expect(loginPage.loginError).toBeVisible();
  });
});

