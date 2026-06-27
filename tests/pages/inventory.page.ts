import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class InventoryPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async expectInventoryPageVisible() {
    await expect(this.page).toHaveURL(/.*inventory\.html/);
    await expect(this.byTestId('title')).toHaveText('Products');
    await expect(this.byTestId('inventory-item')).toHaveCount(6);
    await expect(this.byTestId('inventory-item-name').first()).toBeVisible();
  }

  async expectProductVisible(productName: string) {
    await expect(this.page.getByText(productName)).toBeVisible();
  }

  async addProductToCart(addToCartTestId: string, removeTestId: string) {
    await expect(this.byTestId(addToCartTestId)).toBeVisible();
    await this.byTestId(addToCartTestId).click();

    await this.expectCartBadgeCount(1);
    await expect(this.byTestId(removeTestId)).toBeVisible();
  }

  async removeProductFromCart(removeTestId: string) {
    await expect(this.byTestId(removeTestId)).toBeVisible();
    await this.byTestId(removeTestId).click();
  }

  async openProductDetail(productName: string) {
    await this.page.getByText(productName).click();
  }

  async openCart() {
    await this.byTestId('shopping-cart-link').click();
  }

  async selectSortOption(optionValue: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.byTestId('product-sort-container').selectOption(optionValue);
  }

  async expectCartBadgeCount(count: number) {
    await expect(this.byTestId('shopping-cart-badge')).toHaveText(String(count));
  }

  async expectCartBadgeHidden() {
    await expect(this.byTestId('shopping-cart-badge')).toHaveCount(0);
  }
}
