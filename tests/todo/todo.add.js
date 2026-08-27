const { test, expect } = require('@playwright/test');

test('User can add a todo', async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc/');

    await page.getByPlaceholder('What needs to be done?')
        .fill('TEST_123');

    await page.keyboard.press('Enter');

    await expect(
        page.getByText('TEST_123')
    ).toBeVisible();
});
