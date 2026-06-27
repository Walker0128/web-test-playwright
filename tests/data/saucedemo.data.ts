export const users = {
  standard: {
    username: 'standard_user',
    password: 'secret_sauce',
  },
  invalidPassword: {
    username: 'standard_user',
    password: 'wrong_password',
  },
};

export const products = {
  backpack: {
    name: 'Sauce Labs Backpack',
    description: 'carry.allTheThings() with the sleek, streamlined Sly Pack',
    addToCartTestId: 'add-to-cart-sauce-labs-backpack',
    removeTestId: 'remove-sauce-labs-backpack',
    detailAddToCartTestId: 'add-to-cart',
    detailRemoveTestId: 'remove',
  },
};

export const checkoutInfo = {
  firstName: 'Test',
  lastName: 'User',
  postalCode: '100-0001',
};

export const messages = {
  loginFailed: 'Username and password do not match any user in this service',
  orderComplete: 'Thank you for your order!',
};
