const { test, expect } = require('@playwright/test');

test('test', async ({ page }) => {
  await page.goto('https://demo.playwright.dev/todomvc/#/');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).fill('todo-to-delete');
  await page.getByRole('textbox', { name: 'What needs to be done?' }).press('Enter');
  await expect(page.getByText('todo-to-delete')).toBeVisible();
  await page.getByTestId('todo-title').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.getByText('todo-to-delete')).not.toBeVisible();
});
