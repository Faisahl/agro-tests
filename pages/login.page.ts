import { Page } from "@playwright/test";
const baseUrl:string = process.env.TEST_URL || 'http://127.0.0.1:3000';
export class LoginPage {
  constructor(public readonly page: Page) {} 

  async goto() {
    await this.page.goto(`${baseUrl}/api/auth/login`);
  }

  get usernameInput() {
    return this.page.getByTestId('login-identifier');
  }

  get passwordInput() {
    return this.page.getByTestId('login-password');
  }

  get loginButton() {
    return this.page.getByRole('button', { name: "Submit" });
  }

  get emailLoginRadio() {
    return this.page.getByRole('radio', { name: 'Email' });
  }

  get phoneLoginRadio() {
    return this.page.getByRole('radio', { name: 'Phone No.' });
  }

  get loginError() {
    return this.page.getByTestId('login-fail-error');
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