import { Locator, Page } from "@playwright/test";

export class UserProfilePage {
  constructor(public readonly page: Page) {}

  async goto() {
    await this.page.goto(`${process.env.TEST_URL || 'http://127.0.0.1:3000'}/api/user/dashboard/profile`);
  }

  get username(): Locator {
    return this.page.getByTestId('user-greeting');
  }

  async getUserCrops(): Promise<string[]> {
    return this.page.getByRole('option', { name: 'users-crops' }).allInnerTexts();
  }

  

}