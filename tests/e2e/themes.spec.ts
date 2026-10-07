import { expect, test } from '@playwright/test';

import { THEMES } from '../../shared/theme';
import { runCommand } from './helpers';

test.describe('themes', () => {
  for (const preference of [...THEMES, 'system-dark', 'system-light'] as const) {
    test(`${preference} is correct before hydration`, async ({ page }) => {
      const system = preference.startsWith('system-');
      await page.emulateMedia({ colorScheme: preference === 'system-dark' ? 'dark' : 'light' });
      await page.addInitScript(
        ({ preference: savedPreference, system: followsSystem }) => {
          if (followsSystem) localStorage.removeItem('cv:theme');
          else localStorage.setItem('cv:theme', savedPreference);
        },
        { preference, system },
      );
      await page.route(/\/_nuxt\/.*\.js(?:\?|$)/, route => route.abort());
      await page.goto('/');

      const expected = system ? `System · ${preference.slice(7)}` : preference;
      await expect(page.locator('.theme-picker__label:visible')).toHaveText(
        new RegExp(`^${expected}$`, 'i'),
        {
          useInnerText: true,
        },
      );
      await page.getByLabel('Color theme', { exact: true }).click();
      const selection = system ? 'System' : preference;
      await expect(
        page
          .getByRole('button', { name: `${selection} theme`, exact: true })
          .locator('.theme-picker__check'),
      ).toBeVisible();
      await expect(page.locator('.theme-picker__check:visible')).toHaveCount(1);
    });
  }

  for (const savedTheme of THEMES) {
    test(`the picker restores ${savedTheme} after a refresh without hydration errors`, async ({
      page,
    }) => {
      const hydrationErrors: string[] = [];
      page.on('console', message => {
        if (/hydration/i.test(message.text())) hydrationErrors.push(message.text());
      });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto('/');
      await page.getByLabel('Color theme', { exact: true }).click();
      await page.getByRole('button', { name: `${savedTheme} theme`, exact: true }).click();
      await expect(page.locator('html')).toHaveAttribute('data-theme', savedTheme);

      await page.reload();
      await page.getByLabel('Color theme', { exact: true }).click();
      await expect(
        page.getByRole('button', { name: `${savedTheme} theme`, exact: true }),
      ).toHaveAttribute('aria-pressed', 'true');
      await expect(page.getByRole('button', { name: 'System theme', exact: true })).toHaveAttribute(
        'aria-pressed',
        'false',
      );
      await expect(page.locator('.theme-picker__label:visible')).toHaveText(savedTheme);
      await expect(
        page
          .getByRole('button', { name: 'System theme', exact: true })
          .locator('.theme-picker__check'),
      ).toBeHidden();
      await expect(
        page
          .getByRole('button', { name: `${savedTheme} theme`, exact: true })
          .locator('.theme-picker__check'),
      ).toBeVisible();
      expect(hydrationErrors).toEqual([]);
    });
  }

  test('switches theme, reports the current value, and persists it', async ({ page }) => {
    await page.goto('/cv');
    await runCommand(page, 'theme light');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

    await runCommand(page, 'theme');
    await expect(page.getByRole('log')).toContainText('* light');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  });

  test('without a saved theme, the picker and the terminal follow the system scheme', async ({
    page,
  }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/');
    await expect(page.locator('.theme-picker summary')).toHaveText(/System · light/i, {
      useInnerText: true,
    });

    await page.goto('/cv');
    await runCommand(page, 'theme');
    await expect(page.getByRole('log')).toContainText('* light');
  });

  test('CRT theme renders its restrained scanline layer', async ({ page }) => {
    await page.goto('/cv');
    await runCommand(page, 'theme crt');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'crt');
    const content = await page.evaluate(() => getComputedStyle(document.body, '::after').content);
    expect(content).not.toBe('none');
  });

  test('CRT effects are removed when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/cv');
    await runCommand(page, 'theme crt');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'crt');
    const content = await page.evaluate(() => getComputedStyle(document.body, '::after').content);
    expect(content).toBe('none');
  });

  test('System mode clears the saved choice and responds to device changes', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark', reducedMotion: 'reduce' });
    await page.goto('/');
    await page.getByLabel('Color theme', { exact: true }).click();
    await page.getByRole('button', { name: 'light theme', exact: true }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByLabel('Color theme', { exact: true }).click();
    await page.getByRole('button', { name: 'System theme', exact: true }).click();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
    await expect(page.locator('.theme-picker summary')).toHaveText(/System · dark/i, {
      useInnerText: true,
    });
    await page.emulateMedia({ colorScheme: 'light' });
    await expect(page.locator('.theme-picker summary')).toHaveText(/System · light/i, {
      useInnerText: true,
    });
    await page.reload();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme');
    expect(await page.evaluate(() => localStorage.getItem('cv:theme'))).toBeNull();
  });

  test('CRT scanlines can be disabled independently and stay disabled after reload', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/');
    await page.getByLabel('Color theme', { exact: true }).click();
    await page.getByRole('button', { name: 'crt theme', exact: true }).click();
    await page.getByLabel('Color theme', { exact: true }).click();
    await page.getByLabel('Scanlines', { exact: true }).uncheck();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'crt');
    await expect(page.locator('html')).toHaveAttribute('data-crt-effects', 'off');
    expect(await page.evaluate(() => getComputedStyle(document.body, '::after').content)).toBe(
      'none',
    );
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-crt-effects', 'off');
  });
});
