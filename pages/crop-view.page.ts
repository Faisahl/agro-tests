import { Page } from "@playwright/test";
const baseUrl:string = process.env.TEST_URL || 'http://127.0.0.1:3000';
export class CropViewPage {
  constructor(public readonly page: Page) {}

  async goto(cropId:string) {
    await this.page.goto(`${baseUrl}/api/crops/${cropId}`);
  }

  get chart() {
    return this.page.getByTestId('rates-chart');
  }

  get recentTrendList() {
    return this.page.getByLabel('trend-list');
  }

  changeLimitBtn(lim:string) {
    return this.page.locator('label', { hasText: lim });
  }

  

}