const { test, expect } = require('@playwright/test');
const login = require('../login.spec.json');

test('Valid login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill(login[0].login);
  await page.locator('[data-test="password"]').fill(login[0].password);
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="product-sort-container"]')).toBeVisible();
});
