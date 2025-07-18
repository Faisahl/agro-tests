import { Page } from "@playwright/test";

const baseUrl:string = process.env.TEST_URL || 'http://127.0.0.1:3000';

export class CropsGridPage {
  constructor(public readonly page: Page) {}

  get cropCard() {
    return this.page.getByTestId('crop-card');
  }

  get loginModal() {
    return this.page.getByTestId('login-popup');
  }

  get filterToggle() {
    return this.page.getByRole('button', { name: 'filters-toggle' });
  }

  get sortSelect() {
    return this.page.getByRole('combobox', { name: 'sortselect' });
  }

  get minRateFilter() {
    return this.page.getByRole('textbox', { name: 'Minimum Rs.' });
  }

  get categorySelect() {
    return this.page.getByRole('combobox', { name: 'sortCat' });
  }

  async goto(market: string) {
    await this.page.goto(`${baseUrl}/api/crops?market=${market}`);
  }

  async getCropNames() {
    return await this.cropCard.locator('h3[aria-label="crop-card-name"]').allInnerTexts();
  }

  async getCropRates() {
    return await this.cropCard.getByTestId('crop-card-rate').allInnerTexts();
  }

  async getCropBadges() {
    return await this.cropCard.getByTestId('crop-category-type').allInnerTexts();
  }

  async trackCrop(selected: number) {
    await this.cropCard.nth(selected).getByRole('button', { name: 'track-crop' }).click();
  }

  async selectCropSort(sort: string) {
    await this.sortSelect.selectOption(sort);
    return this.getCropNames();
  }

  async filterByCategory(cat: string) {
    await this.categorySelect.selectOption(cat);
    return await this.getCropBadges();
  }

  trackBtn(num:number) {
    return this.cropCard.nth(num).getByRole('button', { name: 'track-crop' })
  }

  checkTracked(num:number) {
    return this.cropCard.nth(num).getByTestId('crop-tracked');
  }

  getCropNameLink(num:number) {
    return this.cropCard.nth(num).locator('h3[aria-label="crop-card-name"]');
  }

  getCropCardName(num:number) {
    const card = this.page.getByTestId('crop-card').nth(num);
    return card.locator('h3[aria-label="crop-card-name"]').innerText();
  }
}
