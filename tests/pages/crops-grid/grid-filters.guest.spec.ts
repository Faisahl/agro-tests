import test, { expect } from "@playwright/test";
import { CropsGridPage } from "../../../pages/crops.page";
import isAlphabeticAtoZ from "../../../utils/sorts";

// SORT & FILTERING
test('sort crops alphabetically', async ({ page }) => {
  const grid: CropsGridPage = new CropsGridPage(page);
  await grid.goto('karachi');
  await grid.filterToggle.click();

  const crops = await grid.getCropNames();
  const names = await grid.selectCropSort('AtoZ');

  if(JSON.stringify(crops) !== JSON.stringify(names)){
    expect(isAlphabeticAtoZ(names)).toBe(true);
  } else {
    console.warn('Default crops populated alphabetically.');
  }
});

test('filter crops by min price', async ({ page }) => {
  const min = 2000;
  
  const grid = new CropsGridPage(page);
  await grid.goto('karachi');
  await grid.filterToggle.click();

  const beforeCount = (await grid.getCropRates()).length;
  await grid.minRateFilter.fill(test.toString());
  await page.keyboard.press('Tab');

  const filteredRates = await grid.getCropRates();
  expect(filteredRates.length).toBeLessThanOrEqual(beforeCount);

  if(beforeCount !== filteredRates.length){
    const filtered = filteredRates.slice(0,3);
    for(const val of filtered){
      expect(Number(val)).toBeGreaterThanOrEqual(min);
    };
  };
});

test('filter crops by category', async ({ page }) => {
  const grid = new CropsGridPage(page);
  await grid.goto('karachi');
  await grid.filterToggle.click();

  const types = await grid.getCropBadges();
  
  const type = 'Vegetable';
  // await page.waitForSelector('option[value="Vegetable"]');
  // await page.getByRole('option', { name: type }).waitFor();
  const badges = await grid.filterByCategory("Vegetable");
  expect(badges.length).toBeLessThanOrEqual(types.length);
  
  const categories = badges.slice(0,3);
  for(const cat of categories){
    expect(cat).toBe(type);
  };
});


// END SORT & FILTERING