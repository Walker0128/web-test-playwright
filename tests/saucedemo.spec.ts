import { test } from '@playwright/test';
import { checkoutInfo, messages, products, users } from './data/saucedemo.data';
import { CartPage } from './pages/cart.page';
import { CheckoutCompletePage } from './pages/checkout-complete.page';
import { CheckoutInformationPage } from './pages/checkout-information.page';
import { CheckoutOverviewPage } from './pages/checkout-overview.page';
import { InventoryPage } from './pages/inventory.page';
import { LoginPage } from './pages/login.page';

test.describe('Sauce Demo UI tests', () => {
  test('TC-001: login fails with invalid password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await test.step('Open login page and check UI elements', async () => {
      await loginPage.open();
      await loginPage.expectLoginPageVisible();
    });

    await test.step('Submit invalid login credentials', async () => {
      await loginPage.login(users.invalidPassword.username, users.invalidPassword.password);
    });

    await test.step('Verify login error and current page state', async () => {
      await loginPage.expectLoginErrorMessage(messages.loginFailed);
      await loginPage.expectStillOnLoginPage();
    });
  });

  test('TC-002: complete happy checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutInformationPage = new CheckoutInformationPage(page);
    const checkoutOverviewPage = new CheckoutOverviewPage(page);
    const checkoutCompletePage = new CheckoutCompletePage(page);

    await test.step('Login successfully', async () => {
      await loginPage.open();
      await loginPage.expectLoginPageVisible();
      await loginPage.login(users.standard.username, users.standard.password);
      await inventoryPage.expectInventoryPageVisible();
    });

    await test.step('Add product to cart from inventory page', async () => {
      await inventoryPage.expectProductVisible(products.backpack.name);
      await inventoryPage.addProductToCart(
        products.backpack.addToCartTestId,
        products.backpack.removeTestId
      );
    });

    await test.step('Open cart and verify selected product', async () => {
      await inventoryPage.openCart();
      await cartPage.expectCartPageVisible();
      await cartPage.expectCartItemCount(1);
      await cartPage.expectProductInCart(products.backpack.name);
    });

    await test.step('Proceed to checkout and input customer information', async () => {
      await cartPage.checkout();
      await checkoutInformationPage.expectCheckoutInformationPageVisible();
      await checkoutInformationPage.fillCustomerInformation(
        checkoutInfo.firstName,
        checkoutInfo.lastName,
        checkoutInfo.postalCode
      );
      await checkoutInformationPage.continueToOverview();
    });

    await test.step('Verify order overview and finish order', async () => {
      await checkoutOverviewPage.expectCheckoutOverviewPageVisible(products.backpack.name);
      await checkoutOverviewPage.finishOrder();
    });

    await test.step('Verify order completion and return to products page', async () => {
      await checkoutCompletePage.expectCheckoutCompletePageVisible(messages.orderComplete);
      await checkoutCompletePage.backToProducts();
      await inventoryPage.expectInventoryPageVisible();
      await inventoryPage.expectCartBadgeHidden();
    });
  });
});
