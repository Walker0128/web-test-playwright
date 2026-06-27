import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutCompletePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCheckoutCompletePageVisible(expectedMessage: string) {
    await expect(this.page).toHaveURL(/.*checkout-complete\.html/);
    await expect(this.byTestId('title')).toHaveText('Checkout: Complete!');
    await expect(this.byTestId('complete-header')).toHaveText(expectedMessage);
    await expect(this.byTestId('complete-text')).toBeVisible();
    await expect(this.byTestId('back-to-products')).toBeVisible();
  }

  async backToProducts() {
    await this.byTestId('back-to-products').click();
  }
}
