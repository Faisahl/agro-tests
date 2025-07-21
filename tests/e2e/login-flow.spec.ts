import { test, expect } from "../../fixtures/e2e/goto-login";

test.describe('valid login e2e tests', () => {
  test('tce_01 - login user with valid email credential', async ({ loginPage, page, navBar }) => {
    await loginPage.signInUser('admin@kashtdar.com','d8T2[W0[4c-a');
    await expect(navBar.userIconBtn).toBeVisible();
  });
  
  test('tce_02 - login user with valid phone credential', async ({ loginPage, page, navBar }) => {
    await loginPage.selectRadio('phone');
    await loginPage.signInUser('3132134132','d8T2[W0[4c-a');
    await expect(navBar.userIconBtn).toBeVisible();
  });
});

test.describe('invalid login e2e tests', () => {
  test('tce_03 - show invalid email login error (wrong password)', async ({ loginPage, page }) => {
    await loginPage.signInUser('admin@kashtdar.com','d8T2[W0[');
    await expect(loginPage.loginError).toBeVisible();
  });
  
  test('tce_04 - show invalid phone login error (wrong phone)', async ({ loginPage, page }) => {
    await loginPage.selectRadio('phone');
    await loginPage.signInUser('3132190132','d8T2[W0[4c-a');
    await expect(loginPage.loginError).toBeVisible();
  });
});

