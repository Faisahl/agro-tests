import { Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly emailLoginRadio;
  readonly phoneLoginRadio;
  readonly loginError;

  constructor(page: Page){
    this.page = page;
    this.usernameInput = page.getByTestId('login-identifier');
    this.passwordInput = page.getByTestId('login-password');
    this.loginButton = page.getByRole('button', { name: "Submit" });
    this.emailLoginRadio = page.getByRole('radio', { name: 'Email' });
    this.phoneLoginRadio = page.getByRole('radio', { name: 'Phone No.' });
    this.loginError = page.getByTestId('login-fail-error');
  }

  async goto() {
    await this.page.goto(`${process.env.TEST_URL || 'http://127.0.0.1:3000'}/api/auth/login`);
  }

  async selectRadio(rad:string) {
    rad === 'email' && await this.emailLoginRadio.click();
    rad === 'phone' && await this.phoneLoginRadio.click();
  }

  async signInUser(identifier: string, password: string) {
    await this.usernameInput.fill(identifier);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}