import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class ItemDetailPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectItemDetailPageVisible(productName: string) {
    await expect(this.page).toHaveURL(/.*inventory-item\.html/);
    await expect(this.byTestId('inventory-item-name')).toHaveText(productName);
    await expect(this.byTestId('inventory-item-desc')).toBeVisible();
    await expect(this.byTestId('inventory-item-price')).toBeVisible();
    await expect(this.byTestId('back-to-products')).toBeVisible();
  }

  async addProductToCart(addToCartTestId = 'add-to-cart') {
    await expect(this.byTestId(addToCartTestId)).toBeVisible();
    await this.byTestId(addToCartTestId).click();
  }

  async removeProductFromCart(removeTestId = 'remove') {
    await expect(this.byTestId(removeTestId)).toBeVisible();
    await this.byTestId(removeTestId).click();
  }

  async expectRemoveButtonVisible(removeTestId = 'remove') {
    await expect(this.byTestId(removeTestId)).toBeVisible();
  }

  async backToProducts() {
    await this.byTestId('back-to-products').click();
  }
}
