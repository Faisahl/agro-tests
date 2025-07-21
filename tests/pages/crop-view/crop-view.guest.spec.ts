import { test, expect } from "@playwright/test";
import { CropViewPage } from "../../../pages/crop-view.page";

const testData = {
  docId: 'omi72trf5shaidwdiq6t0e2w'
};


test('verify chart is populated - tcg_01', async ({ page }) => {
  const cv = new CropViewPage(page);
  await cv.goto(testData.docId);
  const chart = cv.chart;
  await expect(chart).toBeAttached();
  await chart.screenshot({ path: `screenshots/crop-view/tcg-01-${Date.now()}.png` });
});

test('verify recent trends list is populated correctly - tcg_02', async ({ page }) => {
  const cv = new CropViewPage(page);
  await cv.goto(testData.docId);

  const list = await cv.recentTrendList.getByRole('row').all();
  expect(list.length).toBeGreaterThan(0);
});



// this may be useless, something to keep as manual testing

// test('verify chart changes on user interaction - tcg-02', async ({ page }) => {
//   const curr = Date.now();
//   const cv = new CropViewPage(page);
//   await cv.goto(cid);
  
//   const chart = cv.chart;
//   await expect(chart).toBeAttached();
//   await chart.screenshot({ path: `screenshots/crop-view/tcg-02-before-${curr}.png` });
  
//   const radio = cv.changeLimitBtn('14 D');
//   await radio.check();
//   await expect(radio).toBeChecked();

//   await page.waitForTimeout(750);
//   await chart.screenshot({ path: `screenshots/crop-view/tcg-02-after-${curr}.png` });
// });

