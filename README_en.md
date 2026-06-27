# Web Test Assignment - Sauce Demo

## Overview

This repository contains manual test cases and automated UI tests for the public demo site Sauce Demo.

- Target site: https://www.saucedemo.com/
- Automation tool: Playwright / TypeScript
- CI: GitHub Actions
- Design: Page Object Model

## Target selection rationale

Sauce Demo was selected because it provides common e-commerce flows such as login, product list, cart, and checkout in a safe public demo environment.

I intentionally avoided automating a real SaaS product with a real account in a public repository, because that could introduce account, data, or operational risks. This project focuses on safe, reproducible UI automation while still demonstrating maintainable test design.

## Test scope

The checklist below shows broader test viewpoints. For the assignment submission, two representative cases are implemented as both manual and automated tests.

### Login / Authentication

- [ ] Login succeeds with a valid standard user
- [x] Login fails with an invalid password
- [ ] Login fails with a locked user
- [ ] Username required validation works
- [ ] Password required validation works
- [ ] Special characters and injection-like input do not bypass authentication
- [ ] Logout returns user to the login page

### Product list / Product detail

- [ ] Product list page is displayed correctly
- [ ] Product name, price, image, and description are displayed
- [ ] User can navigate from product list to product detail
- [ ] Product detail page displays product name, description, price, and image
- [ ] Add to cart changes button state to Remove
- [ ] Button state is synchronized between product list and product detail
- [ ] Sort by name and price works correctly

### Cart

- [ ] Product can be added to cart
- [ ] Product can be removed from cart
- [ ] Cart icon opens cart page
- [ ] Cart badge count matches selected item count
- [ ] Cart page displays selected product name, price, and quantity
- [ ] Empty cart checkout behavior matches specification

### Checkout / Order flow

- [x] Happy flow succeeds from login to order completion
- [ ] Customer information input works
- [ ] First name, last name, and postal code validation works
- [ ] Checkout overview displays product, subtotal, tax, and total
- [ ] Repeated fast clicking does not create duplicate order behavior
- [ ] Order completion page displays success message
- [ ] Back Home returns user to product list
- [ ] Cart state is cleared after successful order completion

### Session / Refresh behavior

- [ ] Login state is maintained after refresh
- [ ] Product list is reloaded correctly after refresh
- [ ] Cart state is maintained after refresh
- [ ] Logout state is maintained after refresh

### Non-functional / Security / CI viewpoints

- [ ] GitHub Actions runs automated tests on push and pull request
- [ ] Test report is uploaded as CI artifact
- [ ] Screenshot, video, and trace are retained for failed tests
- [ ] No secrets, credentials, tokens, or private data are committed
- [ ] Load/stress testing is not executed against public third-party sites without permission
- [ ] API tampering and scraping/bot checks are considered only within authorized scope

## Manual test cases

### TC-001: Login fails with invalid password

| Item | Description |
| --- | --- |
| Objective | Verify that the user cannot log in with an invalid password and that an appropriate error message is displayed. |
| Preconditions | Sauce Demo login page is open. |
| Test data | Username: `standard_user` / Password: `wrong_password` |
| Steps | 1. Enter username `standard_user`.<br>2. Enter password `wrong_password`.<br>3. Click Login. |
| Expected result | User remains on the login page and a login error message is displayed. |

### TC-002: Complete happy checkout flow

| Item | Description |
| --- | --- |
| Objective | Verify the main regression flow from login to order completion. |
| Preconditions | Sauce Demo login page is open. |
| Test data | Username: `standard_user` / Password: `secret_sauce`<br>Product: `Sauce Labs Backpack`<br>First Name: `Test` / Last Name: `User` / Postal Code: `100-0001` |
| Steps | 1. Log in with the standard user.<br>2. Verify product list page.<br>3. Add `Sauce Labs Backpack` to cart.<br>4. Open cart and verify selected product.<br>5. Proceed to checkout.<br>6. Input customer information.<br>7. Verify checkout overview.<br>8. Finish order.<br>9. Verify order completion and return to product list. |
| Expected result | Order completion message is displayed, user can return to product list, and cart badge is cleared. |

## Project structure

```text
.github/
└── workflows/
    └── playwright.yml

tests/
├── data/
│   └── saucedemo.data.ts
├── pages/
│   ├── base.page.ts
│   ├── cart.page.ts
│   ├── checkout-complete.page.ts
│   ├── checkout-information.page.ts
│   ├── checkout-overview.page.ts
│   ├── inventory.page.ts
│   ├── item-detail.page.ts
│   └── login.page.ts
└── saucedemo.spec.ts
```

The automated tests use Page Object Model so that test scenarios, page actions/assertions, and test data are separated.

- `tests/saucedemo.spec.ts`: test scenarios and test steps
- `tests/pages/`: page-specific UI operations and assertions
- `tests/data/`: reusable users, product data, checkout data, and messages

## How to run locally

```bash
npm install
npx playwright install --with-deps chromium
npm test
```

Open HTML report:

```bash
npm run report
```

## CI pipeline

GitHub Actions runs Playwright tests automatically on:

- push to `main`
- pull request to `main`
- manual workflow dispatch

CI steps:

1. Checkout repository
2. Setup Node.js 24
3. Install dependencies with `npm ci`
4. Install Playwright Chromium browser
5. Run Playwright tests
6. Upload Playwright HTML report

The workflow file is located at:

```text
.github/workflows/playwright.yml
```
