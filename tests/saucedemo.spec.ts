import { test, expect, type Page } from '@playwright/test';

const STANDARD_USER = 'standard_user';
const PASSWORD = 'secret_sauce';
const INVALID_PASSWORD = 'wrong_password';
const PRODUCT_NAME = 'Sauce Labs Backpack';

async function login(page: Page) {
  await page.goto('/');
  await page.getByPlaceholder('Username').fill(STANDARD_USER);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
}

async function addBackpackToCart(page: Page) {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
}

test.describe('Sauce Demo UI tests', () => {
  test('TC-001: login fails with invalid password', async ({ page }) => {
    await page.goto('/');
    await page.getByPlaceholder('Username').fill(STANDARD_USER);
    await page.getByPlaceholder('Password').fill(INVALID_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page).not.toHaveURL(/.*inventory\.html/);
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match');
  });

  test('TC-002: user can complete the happy path purchase flow', async ({ page }) => {
    await login(page);

    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
    await expect(page.locator('[data-test="inventory-item"]')).toHaveCount(6);

    await addBackpackToCart(page);

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL(/.*cart\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(PRODUCT_NAME);

    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL(/.*checkout-step-one\.html/);

    await page.locator('[data-test="firstName"]').fill('Test');
    await page.locator('[data-test="lastName"]').fill('User');
    await page.locator('[data-test="postalCode"]').fill('100-0001');
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/.*checkout-step-two\.html/);
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(PRODUCT_NAME);
    await expect(page.locator('[data-test="payment-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="shipping-info-label"]')).toBeVisible();
    await expect(page.locator('[data-test="total-info-label"]')).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    await expect(page).toHaveURL(/.*checkout-complete\.html/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');

    await page.locator('[data-test="back-to-products"]').click();
    await expect(page).toHaveURL(/.*inventory\.html/);
    await expect(page.getByText('Products')).toBeVisible();
  });
});
