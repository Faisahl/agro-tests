import test, { expect } from "@playwright/test";
import { CropsGridPage } from "../../../pages/crops.page";

test('tc_01 - track crop as guest', async ({ page }) => {
  const grid = new CropsGridPage(page);
  await grid.goto('karachi');

  await grid.trackCrop(4);
  await expect(grid.loginModal).toBeVisible();
});

test('tc_02 - use grid card name to navigate to crop view page', async ({ page }) => {
  const slct = 3;
  const grid = new CropsGridPage(page);
  await grid.goto('karachi');

  await grid.getCropNameLink(slct).click();
  await expect(page).toHaveTitle('View Crop - Kashtdar');
});

// test('', async ({ page }) => {

// })