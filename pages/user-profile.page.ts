import { Locator, Page } from "@playwright/test";
// const baseUrl:string = process.env.TEST_URL || 'http://127.0.0.1:3000';
export class UserProfilePage {
  constructor(public readonly page: Page) {}
  async goto() {
    await this.page.goto(`/api/user/dashboard/profile`);
  }

  get username(): Locator {
    return this.page.getByTestId('user-greeting');
  }

  getUCItem(str:string) {
    return this.page.locator('.uc-item').getByText(str);
  }
  
  getUCWidget(str:string): Locator {
    return this.page.locator('.uc-widget').getByText(str);
  }
  
  get getUCWidgets(): ()=>Promise<Locator[]> {
    return this.page.locator('.uc-widget').all;
  }
  
  get getUCWidgetNames(): ()=>Promise<string[]> {
    return this.page.locator('uc-widget-name').allInnerTexts;
  }
  
  get deleteCropBtn(): Locator {
    return this.page.getByTestId('user-crop-delete');
  }
  
  async getUserCrops(): Promise<string[]> {
    return this.page.getByRole('option', { name: 'users-crops' }).allInnerTexts();
  }
}