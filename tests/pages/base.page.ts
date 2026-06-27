import { type Locator, type Page } from '@playwright/test';

export abstract class BasePage {
  protected constructor(protected readonly page: Page) {}

  protected byTestId(testId: string): Locator {
    return this.page.locator(`[data-test="${testId}"]`);
  }
}
