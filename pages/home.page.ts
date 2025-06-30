import { Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly signInBtn;
  readonly userIcon;

  constructor(page: Page){
    this.page = page;
    this.signInBtn = page.getByRole('link', { name: 'Sign In' });
    this.userIcon = page.getByTestId('user-icon');
  }

  async goto() {
    await this.page.goto('/');
  }

  async gotoLogin() {
    await this.signInBtn.click();
  }
}