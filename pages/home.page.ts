import { Locator, Page } from "@playwright/test";

const baseUrl: string = process.env.TEST_URL || "http://127.0.0.1:3000";

export class HomePage {
  constructor(readonly page: Page) {}

  async goto() {
    await this.page.goto(`${baseUrl}`);
  }

  get signInBtn(): Locator {
    return this.page.getByRole("link", { name: "Sign In" });
  }

  get userIcon(): Locator {
    return this.page.getByTestId("user-icon");
  }

  get searchBar(): Locator {
    return this.page.getByTestId('agro-search-bar')
  }

  get searchList(): Locator {
    return this.page.getByLabel('agro-search-list');
  }

  get topPctChangeTable(): Locator {
    return this.page.getByTestId('top-x-table');
  }

  async gotoLogin() {
    await this.page.getByRole("link", { name: "Sign In" }).click();
  }
}
