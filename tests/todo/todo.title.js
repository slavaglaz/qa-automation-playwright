
const { test, expect } = require('@playwright/test');

test('TodoMVC has correct title', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    await expect(page).toHaveTitle(/TodoMVC/);
});



