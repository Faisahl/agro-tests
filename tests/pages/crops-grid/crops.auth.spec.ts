import test, { expect } from "@playwright/test";
import { CropsGridPage } from "../../../pages/crops.page";

test("@smoke track crop as user", async ({ page }) => {
  const sel = 4;
  const grid = new CropsGridPage(page);
  await grid.goto("karachi");
  await expect(grid.trackBtn(sel)).toBeVisible();
  await grid.trackCrop(sel);
  await expect(grid.checkTracked(sel)).toBeVisible();
});

// test("track crop as user", async ({ page }) => {
  
// })
