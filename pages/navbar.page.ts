import { expect, Page } from "@playwright/test";

export class NavBar {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // NAV BUTTONS
  get homeBtn() {
    return this.page.getByRole("link", { name: "home-btn" });
  }

  get marketBtn() {
    return this.page.getByRole("link", { name: "market-btn" });
  }

  get blogBtn() {
    return this.page.getByRole("link", { name: "blog-btn" });
  }

  // NAV RESOURCE DD
  get resourceBtn() {
    return this.page.getByRole("button", { name: "resource-btn" });
  }

  get resourceDD() {
    return this.page.getByTestId("resource-dd");
  }

  async openResourceMenu() {
    await this.resourceBtn.click();
    await expect(this.resourceDD).toBeVisible();
  }

  async getResourceItem(rsc: string) {
    return this.resourceDD.getByRole("link", { name: rsc }); // 'Vendors' or 'Crop Schedules'
  }

  // NAV USER DD
  get profileBtn() {
    return this.page.getByRole("link", { name: "user-profile" });
  }

  get dashBtn() {
    return this.page.getByRole("link", { name: "admin-dash-button" });
  }

  get userIconBtn() {
    return this.page.getByTestId("user-icon");
  }

  get userDD() {
    return this.page.getByTestId("user-nav-dd");
  }

  async openUserDD() {
    await this.userIconBtn.click();
    await expect(this.userDD).toBeVisible();
  }

  async getUserDDItem(item: string) {
    return this.userDD.getByRole("link", { name: item }); // 'Profile' or 'Dashboard'
  }

  get logoutBtn() {
    return this.page.getByTestId("logout-button");
  }

  async logout() {
    const ui = this.userIconBtn;
    await ui.click();
    await expect(this.userDD).toBeVisible();
    await this.logoutBtn.click();
  }

  async loginBtn() {
    return this.page.getByRole("link", { name: "Sign In" });
  }
}
