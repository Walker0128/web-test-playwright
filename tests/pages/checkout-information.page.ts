import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CheckoutInformationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCheckoutInformationPageVisible() {
    await expect(this.page).toHaveURL(/.*checkout-step-one\.html/);
    await expect(this.byTestId('title')).toHaveText('Checkout: Your Information');
    await expect(this.byTestId('firstName')).toBeVisible();
    await expect(this.byTestId('lastName')).toBeVisible();
    await expect(this.byTestId('postalCode')).toBeVisible();
    await expect(this.byTestId('continue')).toBeVisible();
    await expect(this.byTestId('cancel')).toBeVisible();
  }

  async fillCustomerInformation(firstName: string, lastName: string, postalCode: string) {
    await this.byTestId('firstName').fill(firstName);
    await this.byTestId('lastName').fill(lastName);
    await this.byTestId('postalCode').fill(postalCode);
  }

  async continueToOverview() {
    await this.byTestId('continue').click();
  }

  async cancelCheckout() {
    await this.byTestId('cancel').click();
  }

  async expectErrorMessage(expectedMessage: string) {
    const errorMessage = this.byTestId('error');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(expectedMessage);
  }
}
