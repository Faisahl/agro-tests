import test, { expect } from "@playwright/test";
import { CropsGridPage } from "../../../pages/crops.page";

test("track crop as user", async ({ page }) => {
  const grid = new CropsGridPage(page);
  await grid.goto("karachi");

  await grid.trackCrop(4);
  await expect(grid.loginModal).toBeVisible();
});
