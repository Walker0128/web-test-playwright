import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class CartPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectCartPageVisible() {
    await expect(this.page).toHaveURL(/.*cart\.html/);
    await expect(this.byTestId('title')).toHaveText('Your Cart');
    await expect(this.page.getByText('QTY')).toBeVisible();
    await expect(this.page.getByText('Description')).toBeVisible();
  }

  async expectProductInCart(productName: string) {
    await expect(this.byTestId('inventory-item-name')).toHaveText(productName);
    await expect(this.byTestId('inventory-item-price')).toBeVisible();
  }

  async expectCartItemCount(count: number) {
    await expect(this.byTestId('inventory-item')).toHaveCount(count);
  }

  async removeProduct(removeTestId: string) {
    await expect(this.byTestId(removeTestId)).toBeVisible();
    await this.byTestId(removeTestId).click();
  }

  async continueShopping() {
    await this.byTestId('continue-shopping').click();
  }

  async checkout() {
    await expect(this.byTestId('checkout')).toBeVisible();
    await this.byTestId('checkout').click();
  }
}
