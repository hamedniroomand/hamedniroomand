import { expect, test } from '@playwright/test';

test('the hero says who Hamed is and how to reach him', async ({ page }) => {
  await page.goto('/');
  const hero = page.locator('.home-hero');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Hamed Niroomand.');
  await expect(hero).toContainText('Senior Web Developer');
  await expect(hero).not.toContainText('Team Lead');
  await expect(hero.getByRole('link', { name: 'Get in touch' })).toHaveAttribute(
    'href',
    '#contact',
  );
  const cv = hero.getByRole('link', { name: 'Download CV' });
  await expect(cv).toHaveAttribute('href', '/hamed-niroomand-cv.pdf');
  await expect(cv).toHaveAttribute('download', 'hamed-niroomand-cv.pdf');
  await expect(hero.getByRole('link', { name: 'LinkedIn profile' })).toHaveAttribute(
    'href',
    /linkedin\.com/,
  );
  await expect(hero.getByRole('link', { name: 'GitHub profile' })).toBeVisible();
  await expect(page.getByLabel('Terminal input')).toHaveCount(0);
});

test('the nav reaches every part and the footer keeps the extras', async ({ page }) => {
  await page.goto('/');
  const nav = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(nav.getByRole('link')).toHaveText(['Experience', 'Projects', 'Contact', 'CV']);
  await expect(nav.getByRole('link', { name: 'CV' })).toHaveAttribute('href', '/cv');
  const footer = page.locator('.site-footer');
  await expect(footer).not.toHaveAttribute('id', 'contact');
  await expect(footer.getByRole('link', { name: 'Dotfiles', exact: true })).toBeVisible();
  await expect(footer.getByRole('link', { name: 'LinkedIn ↗' })).toBeVisible();
  await footer.getByRole('link', { name: /Dotfiles/ }).click();
  await expect(page).toHaveURL(/\/dotfiles$/);
});

test('the home page goes hero, experience, projects, contact', async ({ page }) => {
  await page.goto('/');
  const ids = await page
    .locator('.home-page > section')
    .evaluateAll(sections => sections.map(section => section.id));
  expect(ids).toEqual(['top', 'experience', 'projects', 'contact']);
  await expect(page.getByRole('heading', { name: /Make yourself/ })).toHaveCount(0);
});

test('the home page shows a selection and links to the full project list', async ({ page }) => {
  await page.goto('/');
  const home = page.locator('#projects .project-card');
  await expect(home).toHaveCount(5);
  await expect(page.locator('#project-cpm')).toHaveCount(0);
  await page.getByRole('link', { name: /See all \d+ projects/ }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('All projects.');
  const cpm = page.locator('#project-cpm');
  await expect(cpm).toBeVisible();
  await cpm.getByRole('heading').getByRole('link').click();
  await expect(page).toHaveURL(/\/projects\/cpm$/);
  await page
    .getByRole('navigation', { name: 'Breadcrumb' })
    .getByRole('link', { name: 'Projects' })
    .click();
  await expect(page).toHaveURL(/\/projects$/);
});

test('public terminal opens on demand and closes with focus restored', async ({ page }) => {
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open terminal', exact: true });
  await trigger.click();
  const input = page.getByLabel('Terminal input');
  await expect(input).toBeVisible();
  await expect(page.getByRole('log')).toContainText('projects');
  await expect(page.getByRole('log')).not.toContainText('Senior Web Developer');
  await input.fill('ls experience');
  await input.press('Enter');
  await expect(page.getByRole('log')).toContainText('jack-westin.md');
  await page.getByRole('button', { name: 'Close terminal' }).click();
  await expect(input).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await expect(input).toBeFocused();
});

test('public pages fit the viewport and keep the main navigation', async ({ page }) => {
  for (const path of [
    '/',
    '/projects',
    '/projects/cpm',
    '/projects/cue',
    '/projects/waverune',
    '/projects/kitdev',
    '/projects/edgefit',
    '/projects/layerscope',
    '/projects/masir',
    '/dotfiles',
    '/dotfiles/vscode-settings',
  ]) {
    await page.goto(path);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
    await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  }
});

test('CV is directly accessible with its own canonical and noindex', async ({ request }) => {
  const response = await request.get('/cv');
  expect(response.status()).toBe(200);
  const html = await response.text();
  expect(html).toContain('id="exp-jack-westin"');
  expect(html).toContain('name="robots" content="noindex, follow"');
  expect(html).toContain('rel="canonical" href="http://localhost:3457/cv"');
});

test('the public terminal explores without moving the page', async ({ page }) => {
  await page.goto('/projects/cue');
  await page.getByRole('button', { name: 'Open terminal', exact: true }).click();
  const input = page.getByLabel('Terminal input');

  // None of these has a page of its own, so none of them moves the visitor.
  for (const command of ['cd ~', 'bat ~/experience/thales.md', 'ls ~/projects']) {
    await input.fill(command);
    await input.press('Enter');
  }
  await expect(page.getByRole('log')).toContainText('Thales MFI GmbH');
  await expect(page).toHaveURL(/\/projects\/cue$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Cue.');
  await expect(page.locator('#public-terminal')).not.toHaveClass(/terminal-dock--minimized/);
});

test('work history is public on the home page but role titles are not', async ({ page }) => {
  await page.goto('/');
  const section = page.locator('#experience');
  await expect(section).toContainText('Jack Westin');
  await expect(section).toContainText('Thales MFI GmbH');
  await expect(section).toContainText('Xaankoo');
  await expect(page.locator('body')).not.toContainText('Team Lead');
  await expect(page.locator('body')).not.toContainText('Frontend Team Lead');
});

test('the project page leads with the product and keeps the repository secondary', async ({
  page,
}) => {
  await page.goto('/projects/kitdev');
  const actions = page.locator('.project-page__actions a');
  await expect(actions.first()).toHaveText(/Visit KitDev Space/);
  await expect(actions.first()).not.toHaveClass(/btn-ghost/);
  const repo = page.getByRole('link', { name: /View on GitHub/ });
  await expect(repo).toHaveClass(/btn-ghost/);
  await expect(repo).toHaveAttribute('href', 'https://github.com/hamedniroomand/kitdev-space');
});

test('the private client project links the company site and has no repository', async ({
  page,
}) => {
  await page.goto('/projects/cpm');
  const visit = page.getByRole('link', { name: /Visit Customer Portfolio Management/ });
  await expect(visit).toHaveAttribute('href', 'https://thales-mfi.com');
  await expect(page.getByRole('link', { name: /View on GitHub/ })).toHaveCount(0);
  await expect(page.getByText('Private source', { exact: true })).toBeVisible();
});

test('the terminal window minimizes, maximizes and keeps its session', async ({
  page,
  isMobile,
}) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open terminal', exact: true }).click();
  const input = page.getByLabel('Terminal input');
  await input.fill('ls projects');
  await input.press('Enter');
  await expect(page.getByRole('log')).toContainText('cue');

  const dock = page.locator('#public-terminal');
  // A phone has no room for a small window, so the terminal opens at full size there.
  await expect(dock).toHaveClass(isMobile ? /terminal-dock--maximized/ : /terminal-dock--normal/);
  if (isMobile) {
    await page.getByRole('button', { name: 'Restore terminal size' }).click();
    await expect(dock).toHaveClass(/terminal-dock--normal/);
  }

  await page.getByRole('button', { name: 'Maximize terminal' }).click();
  await expect(dock).toHaveClass(/terminal-dock--maximized/);
  await page.getByRole('button', { name: 'Restore terminal size' }).click();
  await expect(dock).toHaveClass(/terminal-dock--normal/);

  await page.getByRole('button', { name: 'Minimize terminal' }).click();
  await expect(dock).toHaveClass(/terminal-dock--minimized/);
  await expect(input).toBeHidden();

  // The window comes back at the size it had, and the shell session is still there.
  await page.getByRole('button', { name: 'Restore terminal', exact: true }).click();
  await expect(dock).toHaveClass(/terminal-dock--normal/);
  await expect(input).toBeVisible();
  await expect(page.getByRole('log')).toContainText('cue');
});

test('the terminal minimizes when a command opens another page', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Open terminal', exact: true }).click();
  const dock = page.locator('#public-terminal');
  await expect(dock).not.toHaveClass(/terminal-dock--minimized/);

  const input = page.getByLabel('Terminal input');
  await input.fill('cat ~/.vscode/extensions.txt');
  await input.press('Enter');

  await expect(page).toHaveURL(/\/dotfiles\/vscode-extensions$/);
  await expect(dock).toHaveClass(/terminal-dock--minimized/);

  // The session is still there when the window comes back.
  await page.getByRole('button', { name: 'Restore terminal', exact: true }).click();
  await expect(page.getByRole('log')).toContainText('vue.volar');
});

test('a command for the page already open leaves the terminal alone', async ({ page }) => {
  await page.goto('/projects/cue');
  const dock = page.locator('#public-terminal');

  // The path button runs `bat ~/projects/cue/README.md`, whose page is this one.
  await page.getByRole('button', { name: /~\/projects\/cue/ }).click();
  await expect(page.getByRole('log')).toContainText('Cue');
  await expect(page).toHaveURL(/\/projects\/cue$/);
  await expect(dock).not.toHaveClass(/terminal-dock--minimized/);

  // A command whose page is a different one still steps out of the way.
  const input = page.getByLabel('Terminal input');
  await input.fill('cat ~/.config/Code/User/settings.json');
  await input.press('Enter');
  await expect(page).toHaveURL(/\/dotfiles\/vscode-settings$/);
  await expect(dock).toHaveClass(/terminal-dock--minimized/);
});
