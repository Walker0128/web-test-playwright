import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutOverviewPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCheckoutOverviewPageVisible(productName: string) {
    await expect(this.page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(this.byTestId('title')).toHaveText('Checkout: Overview');
    await expect(this.byTestId('inventory-item-name')).toHaveText(productName);
    await expect(this.byTestId('inventory-item-price')).toBeVisible();
    await expect(this.byTestId('payment-info-label')).toBeVisible();
    await expect(this.byTestId('shipping-info-label')).toBeVisible();
    await expect(this.byTestId('total-info-label')).toBeVisible();
    await expect(this.byTestId('summary-subtotal-label')).toBeVisible();
    await expect(this.byTestId('summary-tax-label')).toBeVisible();
    await expect(this.byTestId('summary-total-label')).toBeVisible();
    await expect(this.byTestId('finish')).toBeVisible();
    await expect(this.byTestId('cancel')).toBeVisible();
  }

  async finishOrder() {
    await this.byTestId('finish').click();
  }

  async cancelCheckout() {
    await this.byTestId('cancel').click();
  }
}
