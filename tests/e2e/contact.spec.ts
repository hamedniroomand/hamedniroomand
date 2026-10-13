import { expect, test } from '@playwright/test';

import { DISCORD_MOCK_URL } from './helpers';

test.describe('contact form', () => {
  test.skip(({ isMobile }) => isMobile, 'desktop only');

  test('sends once the turnstile widget has issued a token', async ({ page, request }) => {
    await page.goto('/cv');
    const input = page.getByLabel('Terminal input');
    await input.fill('contact');
    await input.press('Enter');

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await dialog.getByLabel('name:').fill('Ada');
    await dialog.getByLabel('email:').fill('ada@example.com');
    await dialog.getByLabel('message:').fill('Hello there, this is long enough to send.');

    const send = dialog.getByRole('button', { name: 'Send message' });
    await expect(send).toBeDisabled();
    await expect(send).toBeEnabled({ timeout: 15_000 });
    await send.click();
    await expect(dialog.getByRole('status')).toContainText('Sent.');
    await expect(dialog.getByRole('button', { name: 'Close' })).toBeFocused();

    const delivered = await (await request.get(`${DISCORD_MOCK_URL}/messages`)).json();
    expect(JSON.stringify(delivered)).toContain('ada@example.com');
  });

  test('shows a validation error under every invalid field and does not send', async ({ page }) => {
    await page.goto('/cv');
    const input = page.getByLabel('Terminal input');
    await input.fill('contact');
    await input.press('Enter');

    const dialog = page.getByRole('dialog');
    await dialog.getByLabel('name:').fill(' ');
    await dialog.getByLabel('email:').fill('asd');
    await dialog.getByLabel('message:').fill('hi');
    const send = dialog.getByRole('button', { name: 'Send message' });
    await expect(send).toBeEnabled({ timeout: 15_000 });
    await send.click();

    await expect(dialog.getByText('name is required')).toBeVisible();
    await expect(dialog.getByText('email must be valid')).toBeVisible();
    await expect(dialog.getByText('message must be at least 10 characters')).toBeVisible();
    await expect(dialog.getByLabel('email:')).toHaveAttribute('aria-invalid', 'true');
    await expect(dialog.getByRole('status')).toHaveCount(0);
  });

  test('the home page form sends a message', async ({ page, request }) => {
    await page.goto('/');
    const section = page.locator('#contact');
    await expect(section.locator('.turnstile')).toHaveCount(0);
    await section.getByRole('textbox', { name: 'Name' }).fill('Grace');
    await section.getByRole('textbox', { name: 'Email' }).fill('grace@example.com');
    await section
      .getByRole('textbox', { name: 'Message' })
      .fill('We have a role that fits your work on Nuxt.');
    const send = section.getByRole('button', { name: 'Send message' });
    await expect(send).toBeEnabled({ timeout: 15_000 });
    await send.click();
    await expect(section.getByRole('status')).toContainText('on its way');
    await expect(section.getByRole('status')).toBeFocused();

    const delivered = await (await request.get(`${DISCORD_MOCK_URL}/messages`)).json();
    expect(JSON.stringify(delivered)).toContain('grace@example.com');
  });

  test('the home page form moves focus to the first invalid field', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#contact');
    await section.getByRole('textbox', { name: 'Name' }).fill('Grace');
    await section.getByRole('textbox', { name: 'Email' }).fill('not an address');
    const send = section.getByRole('button', { name: 'Send message' });
    await expect(send).toBeEnabled({ timeout: 15_000 });
    await send.click();
    await expect(section.getByRole('textbox', { name: 'Email' })).toBeFocused();
  });

  test('the home page form moves focus to a server error', async ({ page }) => {
    await page.route('**/api/contact', route =>
      route.fulfill({ status: 429, json: { message: 'too many messages, try again later' } }),
    );
    await page.goto('/');
    const section = page.locator('#contact');
    await section.getByRole('textbox', { name: 'Name' }).fill('Grace');
    await section.getByRole('textbox', { name: 'Email' }).fill('grace@example.com');
    await section.getByRole('textbox', { name: 'Message' }).fill('A message that is long enough.');
    const send = section.getByRole('button', { name: 'Send message' });
    await expect(send).toBeEnabled({ timeout: 15_000 });
    await send.click();
    await expect(section.getByRole('alert')).toHaveText('too many messages, try again later');
    await expect(section.getByRole('alert')).toBeFocused();
  });

  for (const [cause, answer] of [
    ['is blocked', { abort: true }],
    ['loads as an empty script', { abort: false }],
  ] as const) {
    test(`the home page form says so when the spam check ${cause}`, async ({ page }) => {
      await page.route(/challenges\.cloudflare\.com/, route =>
        answer.abort
          ? route.abort()
          : route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }),
      );
      await page.goto('/');
      const section = page.locator('#contact');
      await section.getByRole('textbox', { name: 'Name' }).focus();
      await expect(section.getByRole('alert')).toContainText('The spam check failed');
      await expect(section.getByRole('alert')).toContainText('hamed@niroomand.dev');
    });
  }

  test('the home page shows every contact route as text', async ({ page }) => {
    await page.goto('/');
    const section = page.locator('#contact');
    await expect(section.getByRole('heading', { name: 'Say hello.' })).toBeVisible();
    await expect(section.getByRole('link', { name: 'hamed@niroomand.dev' })).toHaveAttribute(
      'href',
      'mailto:hamed@niroomand.dev',
    );
    await expect(section.getByRole('link', { name: /linkedin\.com\/in\// })).toBeVisible();
    await expect(section.getByRole('link', { name: /github\.com\// })).toBeVisible();
    await expect(section.getByRole('button', { name: 'Copy email address' })).toBeVisible();
    await expect(section).toContainText('Yerevan · UTC+4 · Remote');
  });

  test('the terminal contact dialog keeps its own name on the home page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Open terminal', exact: true }).click();
    const input = page.getByLabel('Terminal input');
    await input.fill('contact');
    await input.press('Enter');
    await expect(page.getByRole('dialog', { name: '$ contact --send' })).toBeVisible();
  });

  test('the turnstile widget is as wide as the message field', async ({ page }) => {
    await page.goto('/cv');
    const input = page.getByLabel('Terminal input');
    await input.fill('contact');
    await input.press('Enter');
    const dialog = page.getByRole('dialog');
    const widget = dialog.locator('.turnstile');
    await expect(widget).toBeVisible();
    const [w, t] = await Promise.all([
      widget.boundingBox(),
      dialog.getByLabel('message:').boundingBox(),
    ]);
    expect(w!.x).toBeCloseTo(t!.x, 0);
    expect(w!.width).toBeCloseTo(t!.width, 0);
  });
});
