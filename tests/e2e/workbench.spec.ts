import { expect, test } from '@playwright/test';

test('JSON sample formats, compacts, validates, and recovers without uploading input', async ({
  page,
}) => {
  await page.goto('/projects/kitdev');
  const input = page.getByLabel('Input', { exact: true });
  const result = page.getByLabel('Result', { exact: true });
  const requests: string[] = [];
  page.on('request', request => {
    if (request.method() !== 'GET') requests.push(request.url());
  });
  await input.fill('{"hello":[1,true,null]}');
  await expect(result).toHaveValue('');
  await page.getByRole('button', { name: 'Format JSON', exact: true }).click();
  await expect(result).toHaveValue('{\n  "hello": [\n    1,\n    true,\n    null\n  ]\n}');
  await page.getByRole('button', { name: 'Compact', exact: true }).click();
  await expect(result).toHaveValue('{"hello":[1,true,null]}');
  await input.fill('{broken');
  await page.getByRole('button', { name: 'Format JSON', exact: true }).click();
  await expect(input).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('alert')).toContainText('could not be parsed');
  await expect(page.getByRole('button', { name: 'Copy result', exact: true })).toBeDisabled();
  await input.fill('');
  await page.getByRole('button', { name: 'Format JSON', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Add some JSON');
  await page.getByRole('button', { name: 'Load sample', exact: true }).click();
  await expect(result).toHaveValue(/KitDev Space/);
  await expect(input).toHaveAttribute('aria-invalid', 'false');
  expect(requests).toEqual([]);
});

test('JSON result can be copied', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/projects/kitdev');
  await page.getByRole('button', { name: 'Copy result', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Copied', exact: true })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('KitDev Space');
});
