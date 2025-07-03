import { Page } from "@playwright/test";

const baseUrl:string = process.env.TEST_URL || 'http://127.0.0.1:3000';

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
    await this.page.goto(`${baseUrl}`);
  }

  async gotoLogin() {
    await this.signInBtn.click();
  }
}