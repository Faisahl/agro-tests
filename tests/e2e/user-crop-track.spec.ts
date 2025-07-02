import test, { expect } from "@playwright/test";
import { NavBar } from "../../pages/navbar.page";

test('user flow of tracking crop to profile view', async ({ page }) => {
  await page.goto('/')

  const nav: NavBar = new NavBar(page);
  await nav.openUserDD();
  const pb = await nav.getUserDDItem('Profile');
  pb.click();
  await expect(page).toHaveTitle('User Profile - Kashtdar');





})