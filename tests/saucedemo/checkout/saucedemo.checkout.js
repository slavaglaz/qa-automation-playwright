const { test, expect } = require('@playwright/test');
const products = require('../products.spec.json');



test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="product-sort-container"]'))
    .toBeVisible();
});


test('Valid checkout', async ({ page }) => {
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="item-0-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText(products[0].name)).toBeVisible();
  await expect(page.getByText(products[1].name)).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('standard_user');
  await page.locator('[data-test="lastName"]').fill('secret_sauce');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="subtotal-label"]')).toBeVisible();
  await expect(page.locator('[data-test="subtotal-label"]')).toContainText('Item total: $' + (products[0].price + products[1].price).toFixed(2));
});

test('missing first name', async ({ page }) => {await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="item-0-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText(products[0].name)).toBeVisible();
  await expect(page.getByText(products[1].name)).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="lastName"]').fill('secret_sauce');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText("Error: First Name is required");
});


test('missing last name', async ({ page }) => {await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="item-0-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText(products[0].name)).toBeVisible();
  await expect(page.getByText(products[1].name)).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('standard_user');
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText("Error: Last Name is required");

});

test('missing postal code', async ({ page }) => {await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await expect(page.locator('[data-test="item-0-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.getByText(products[0].name)).toBeVisible();
  await expect(page.getByText(products[1].name)).toBeVisible();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').fill('standard_user');
  await page.locator('[data-test="lastName"]').fill('secret_sauce');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('[data-test="error"]')).toContainText("Error: Postal Code is required");


});
