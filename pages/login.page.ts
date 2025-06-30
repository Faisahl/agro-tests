import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly emailRadio;
  readonly phoneRadio;

  constructor(page: Page){
    this.page = page;
    this.usernameInput = page.locator('#identifier');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#submitBtn');
    this.emailRadio = page.locator('#email-radio');
    this.phoneRadio = page.locator('#contact-radio');
  }

  async goto() {
    await this.page.goto('http://localhost:3000/api/auth/login');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async phoneLogin(phone: string, password: string) {
    await this.phoneRadio.click();
    await this.usernameInput.fill(phone);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}