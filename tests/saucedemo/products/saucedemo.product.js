const { test, expect } = require('@playwright/test');
const products = require('../products.spec.json');
const login = require('../login.spec.json');

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill(login[0].login);
  await page.locator('[data-test="password"]').fill(login[0].password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
});

test('Product list is displayed', async ({ page }) => {
  await expect(
    page.locator('[data-test$="-title-link"]')).toHaveCount(products.length);

  for (const product of products) {
    await expect(
      page.locator('[data-test$="-title-link"]')
        .filter({ hasText: product.name })
    ).toBeVisible();
  }
});

test('Each product opens with correct details', async ({ page }) => {
  for (const product of products) {
    await page.locator('[data-test$="-title-link"]')
      .filter({ hasText: product.name })
      .click();

    await expect(
      page.locator('[data-test="inventory-item-name"]')
    ).toHaveText(product.name);

    await expect(
      page.locator('[data-test="inventory-item-desc"]')
    ).toHaveText(product.description);

    await page.goBack();

    await expect(page.locator('.inventory_list')).toBeVisible();
  }
});


test('Product sorting works correctly', async ({ page }) => {
  const expectedPrices = products
    .map((product) => product.price)
    .sort((firstPrice, secondPrice) => firstPrice - secondPrice);

  await page.locator('[data-test="product-sort-container"]')
    .selectOption('lohi');

  const actualPrices = await page
    .locator('[data-test="inventory-item-price"]')
    .allTextContents();

  expect(actualPrices.map((price) => Number(price.replace('$', ''))))
    .toEqual(expectedPrices);
});

test('Add to cart works correctly', async ({ page }) => {
  await expect(page.locator('[data-test="item-4-img-link"]')).toBeVisible();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toBeVisible();
  await expect(page.locator('[data-test="inventory-item-name"]')).toContainText(products[0].name);
  await page.locator('[data-test="inventory-item-price"]').click();
  await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$' + products[0].price.toFixed(2))  
});