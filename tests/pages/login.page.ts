import { expect, type Page } from '@playwright/test';
import { BasePage } from './base.page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async open() {
    await this.page.goto('/');
  }

  async expectLoginPageVisible() {
    await expect(this.page.locator('.login_logo')).toHaveText('Swag Labs');
    await expect(this.byTestId('username')).toBeVisible();
    await expect(this.byTestId('password')).toBeVisible();
    await expect(this.byTestId('login-button')).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.byTestId('username').fill(username);
    await this.byTestId('password').fill(password);
    await this.byTestId('login-button').click();
  }

  async expectLoginErrorMessage(expectedMessage: string) {
    const errorMessage = this.byTestId('error');

    await expect(errorMessage).toBeVisible();
    await expect(errorMessage).toContainText(expectedMessage);
  }

  async expectStillOnLoginPage() {
    await expect(this.byTestId('username')).toBeVisible();
    await expect(this.byTestId('password')).toBeVisible();
    await expect(this.byTestId('login-button')).toBeVisible();
    await expect(this.page).not.toHaveURL(/.*inventory\.html/);
  }
}
