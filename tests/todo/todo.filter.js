const { test, expect } = require('@playwright/test');

test('Clear completed todos', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('need to be done');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await page.getByRole('checkbox', { name: 'Toggle Todo' }).check();
  await page.getByRole('link', { name: 'Active' }).click();
  await expect(page.getByText('need to be done')).not.toBeVisible();
  await page.getByRole('link', { name: 'Completed' }).click();
  await expect(page.getByText('need to be done')).toBeVisible();
  await page.getByRole('button', { name: 'Clear completed' }).click();
  await expect(page.getByText('need to be done')).not.toBeVisible();
});





