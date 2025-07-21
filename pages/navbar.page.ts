import { expect, Locator, Page } from "@playwright/test";

export class NavBar {
  constructor(public readonly page: Page) {} 

  // NAV BUTTONS
  get homeBtn(): Locator {
    return this.page.getByRole("link", { name: "home-btn" });
  }

  get marketBtn(): Locator {
    return this.page.getByRole("link", { name: "market-btn" });
  }

  get blogBtn(): Locator {
    return this.page.getByRole("link", { name: "blog-btn" });
  }

  // NAV RESOURCE DD
  get resourceBtn(): Locator {
    return this.page.getByRole("button", { name: "resource-btn" });
  }

  get resourceDD(): Locator {
    return this.page.getByTestId("resource-dd");
  }
  
  // NAV USER
  get langBtn(): Locator {
    return this.page.getByLabel('select-lang');    
  }

  get signInBtn(): Locator {
    return this.page.getByRole("link", { name: "Sign In" });
  }
  
  get userIconBtn(): Locator {
    return this.page.getByTestId("user-icon");
  }

  // NAV USER DD
  get userDD(): Locator {
    return this.page.getByTestId("user-nav-dd");
  }

  get profileBtn(): Locator {
    return this.userDD.getByRole("link", { name: "user-profile" });
  }

  get dashboardBtn(): Locator {
    return this.userDD.getByRole("link", { name: "admin-dash-button" });
  }

  get logoutBtn(): Locator {
    return this.userDD.getByTestId("logout-button");
  }
  
  get loginBtn(): Locator {
    return this.userDD.getByRole("link", { name: "Sign In" });
  }

  async openResourceMenu() {
    await this.resourceBtn.click();
    await expect(this.resourceDD).toBeVisible();
  }

  async getResourceItem(rsc: string) {
    return this.resourceDD.getByRole("link", { name: rsc }); // 'Vendors' or 'Crop Schedules'
  }

  async openUserDD() {
    await this.userIconBtn.click();
    await expect(this.userDD).toBeVisible();
  }

  async getUserDDItem(item: string) {
    return this.userDD.getByRole("link", { name: item }); // 'Profile' or 'Dashboard'
  }

  async switchLang() {
    const langs = this.page.getByLabel('select-lang').locator('div');
    await langs.nth(0).click();
    await langs.nth(1).click();
  }
  
  async logout() {
    const ui = this.userIconBtn;
    await ui.click();
    await expect(this.userDD).toBeVisible();
    await this.logoutBtn.click();
  }

}
