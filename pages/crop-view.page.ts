import { Page } from "@playwright/test";

export class CropViewPage {
  constructor(public readonly page: Page) {}

  async goto(cropId:string) {
    await this.page.goto(`${process.env.TEST_URL || 'http://127.0.0.1:3000'}/api/crops/${cropId}`);
  }

  get chart() {
    return this.page.getByTestId('rates-chart');
  }

  changeLimitBtn(lim:string) {
    return this.page.locator('label', { hasText: lim });
  }

  

}