import { Page } from "@playwright/test";

export class CropsGridPage {
  readonly page: Page;
  readonly cropCard;
  readonly loginModal;
  readonly filtertoggle;
  readonly sortSelect;
  readonly minRateFilter;
  readonly categorySelect;

  constructor(page: Page){
    this.page = page;
    this.cropCard = page.getByTestId('crop-card');
    this.filtertoggle = page.getByRole('button', { name: 'filters-toggle' });
    this.loginModal = page.getByTestId('login-popup');
    this.sortSelect = page.getByRole('combobox', { name: 'sortselect' });
    this.minRateFilter = page.getByRole('textbox', { name: 'Minimum Rs.' });
    this.categorySelect = page.getByRole('combobox', { name: 'sortCat' })
  }

  async goto(market:string) {
    await this.page.goto(`/api/crops?market=${market}`);
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

  async trackCrop(selected:number) {
    const card = this.cropCard.nth(selected);
    await card.getByRole('button', { name: 'track-crop' }).click();
  }

  async selectCropSort(sort:string) {
    await this.sortSelect.selectOption(sort);
    const crops = await this.cropCard.locator('h3[aria-label="crop-card-name"]').allInnerTexts();
    return crops;    
  }

  async filterByCategory(cat:string) {
    await this.categorySelect.selectOption(cat);
    const categories = await this.page.getByTestId('crop-category-type').allInnerTexts();
    return categories;
  }

}