import { expect, Locator, test } from "@playwright/test";
import { HomePage } from "../../../pages/home.page";
import { NavBar } from "../../../pages/navbar.page";

const testData = {
  searchTerm: "Black Princess Pepper",
  wrongSearchTerm: "Zoobyzoo",
  isArabic:
    /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/,
};

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test.describe.serial("happy/sad searchbar tests", () => {
  
  test("@smoke - verify search function - tc_01", async ({ page }) => {
    const home: HomePage = new HomePage(page);

    await home.searchBar.click();
    await home.searchBar.fill(testData.searchTerm);

    const results: Locator[] = await home.searchList
      .getByRole("listitem")
      .all();
    await expect(results[0].textContent()).toContain(testData.searchTerm);

    await results[0].click();
    await expect(page).toHaveTitle("View Crop - Kashtdar");
  });

  test("verify search function (invalid term) - tc_02", async ({ page }) => {
    const home: HomePage = new HomePage(page);

    await home.searchBar.click();
    await home.searchBar.fill(testData.wrongSearchTerm);

    const results: Locator[] = await home.searchList
      .getByRole("listitem")
      .all();
    await expect(results[0].innerText()).toBe('No Results Found');
  });
});

test.describe("@smoke - home page priority functions", () => {
  
  test("verify top % change list - tc_03", async ({ page }) => {
    const home: HomePage = new HomePage(page);
    const rows = await home.topPctChangeTable
      .locator("tbody")
      .getByRole("row")
      .all();
    expect(rows.length).toBeGreaterThan(0);
  });

  test("verify language change - tc_04", async ({ page }) => {
    const nav: NavBar = new NavBar(page);
    await nav.switchLang();

    const text: string = await nav.marketBtn.innerText();
    expect(testData.isArabic.test(text)).toBe(true);
  });
});
