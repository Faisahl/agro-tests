import { test as should } from "@playwright/test";
import { test, expect } from "../../../fixtures/e2e/goto-login";
import { validTestUser as user } from "../../../test-data/users";

should.describe("@smoke - valid/invalid user sign in", () => {
  test("tc_01 - login user with valid email credential", async ({
    loginPage,
    page,
    navBar,
  }) => {
    await loginPage.signInUser(user.email, user.password);
    await expect(page).toHaveURL("/");
    await expect(navBar.userIconBtn).toBeVisible();
  });

  test("tc_02 - login user with valid phone credential", async ({
    loginPage,
    page,
    navBar,
  }) => {
    await loginPage.selectRadio("phone");
    await loginPage.signInUser(user.phone, user.password);
    await expect(page).toHaveURL("/");
    await expect(navBar.userIconBtn).toBeVisible();
  });

  test("tc_03 - show invalid email login error (wrong password)", async ({
    loginPage,
  }) => {
    await loginPage.signInUser(user.email, "wrongpass");
    await expect(loginPage.loginError).toBeVisible();
  });
});

test("tc_04 - show invalid phone login error (wrong phone)", async ({
  loginPage,
}) => {
  await loginPage.selectRadio("phone");
  await loginPage.signInUser("000010000", user.password);
  await expect(loginPage.loginError).toBeVisible();
});
