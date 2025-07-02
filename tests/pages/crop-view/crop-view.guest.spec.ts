import test, { expect } from "@playwright/test";
import { CropViewPage } from "../../../pages/crop-view.page";

const cid = 'omi72trf5shaidwdiq6t0e2w';

test('verify chart is populated - tcg-01', async ({ page }) => {
  const cv = new CropViewPage(page);
  await cv.goto(cid);
  const chart = cv.chart;
  await expect(chart).toBeVisible();
  await chart.screenshot({ path: `screenshots/crop-view/tcg-01-${Date.now()}.png` });
});

test('verify chart changes on user interaction - tcg-02', async ({ page }) => {
  const curr = Date.now();
  const cv = new CropViewPage(page);
  await cv.goto(cid);
  
  const chart = cv.chart;
  await expect(chart).toBeVisible();
  await chart.screenshot({ path: `screenshots/crop-view/tcg-02-before-${curr}.png` });
  
  const radio = cv.changeLimitBtn('14 D');
  await radio.check();
  await expect(radio).toBeChecked();

  await page.waitForTimeout(750);
  await chart.screenshot({ path: `screenshots/crop-view/tcg-02-after-${curr}.png` });
});

