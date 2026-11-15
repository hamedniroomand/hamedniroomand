import { readFile, writeFile } from 'node:fs/promises';

import { chromium } from '@playwright/test';

import {
  listMarkdown,
  readJson,
  readMarkdown,
  slugOf,
  validate,
} from '../modules/cv-content/read.ts';
import { ogCardFile } from '../shared/cv/og-card.ts';
import type { Profile } from '../shared/schemas/profile.ts';
import { ProfileSchema } from '../shared/schemas/profile.ts';
import { ProjectFrontmatter } from '../shared/schemas/project.ts';
import { DEFAULT_SITE_HOST } from '../shared/site-host.ts';

interface Card {
  file: string;
  /** The small line above the heading. */
  eyebrow: string;
  /** The path shown at the right of the eyebrow row. */
  path: string;
  heading: string;
  /** The second part of the heading. It is italic and takes the accent colour. */
  accent: string;
  line: string;
}

const WIDTH = 1200;
const HEIGHT = 630;
const FONT_FILES = 'node_modules/@fontsource/old-standard-tt/files';
const FONTS = {
  normal: `${FONT_FILES}/old-standard-tt-latin-400-normal.woff2`,
  italic: `${FONT_FILES}/old-standard-tt-latin-400-italic.woff2`,
};

/** The dark theme of the site. Keep these values equal to `app/assets/css/themes.css`. */
const THEME = {
  bg: '#0c2547',
  fg: '#eef3fb',
  dim: '#a8bcdb',
  accent: '#ffd24a',
  border: '#274a7e',
};

interface CardFonts {
  normal: string;
  italic: string;
}

function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Each project gets a card of its own, so a shared link shows the project and not the home page. */
async function projectCards(): Promise<Card[]> {
  const projectList: Card[] = [];
  for (const name of await listMarkdown('content/projects')) {
    const file = `content/projects/${name}`;
    const project = validate(ProjectFrontmatter, (await readMarkdown(file)).data, file);
    const slug = slugOf(name);
    const client = project.client !== undefined;
    projectList.push({
      file: `public/${ogCardFile(slug)}`,
      eyebrow: client ? 'Client work' : 'Project',
      path: `~/projects/${slug}`,
      heading: `${project.name}.`,
      accent: project.tagline,
      line: `${client ? 'Client work' : 'A project'} by Hamed Niroomand. Read it at ${DEFAULT_SITE_HOST}.`,
    });
  }
  return projectList;
}

function cards(profile: Profile): Card[] {
  return [
    {
      file: `public/${ogCardFile('home')}`,
      eyebrow: 'Personal website',
      path: '~/hamed',
      heading: `${profile.name}.`,
      accent: 'Senior Frontend Engineer.',
      line: 'Measured results, work history, projects and a way to get in touch.',
    },
    {
      file: `public/${ogCardFile('resume')}`,
      eyebrow: 'Curriculum vitae',
      path: '~/hamed/cv',
      heading: profile.name,
      accent: profile.title,
      line: profile.tagline ?? '',
    },
    {
      file: `public/${ogCardFile('dotfiles')}`,
      eyebrow: 'Behind the scenes',
      path: '~/.config',
      heading: 'Dotfiles.',
      accent: 'Borrow what is useful.',
      line: `The configuration files that ${profile.name} uses every day.`,
    },
  ];
}

/** A long heading needs a smaller size, or it fills the whole card. */
function headingSize(card: Card): number {
  const longest = Math.max(card.heading.length, card.accent.length);
  if (longest > 34) return 62;
  if (longest > 24) return 76;
  return 92;
}

function cardHtml(card: Card, fonts: CardFonts): string {
  return `<!doctype html>
<style>
  @font-face { font-family: 'Old Standard TT'; src: url(data:font/woff2;base64,${fonts.normal}) format('woff2'); }
  @font-face { font-family: 'Old Standard TT'; font-style: italic; src: url(data:font/woff2;base64,${fonts.italic}) format('woff2'); }
  html, body { margin: 0; }
  body {
    position: relative; isolation: isolate; overflow: hidden;
    width: ${WIDTH}px; height: ${HEIGHT}px; box-sizing: border-box; padding: 64px 84px;
    display: flex; flex-direction: column; justify-content: space-between;
    background: ${THEME.bg}; color: ${THEME.fg};
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  }
  /* The squared paper that the site draws behind its pages. */
  body::before {
    content: ''; position: absolute; z-index: -2; inset: 0;
    background-image:
      linear-gradient(rgb(238 243 251 / 6%) 1px, transparent 1px),
      linear-gradient(90deg, rgb(238 243 251 / 6%) 1px, transparent 1px);
    background-size: 30px 30px;
  }
  .eyebrow { display: flex; justify-content: space-between; font-size: 22px; color: ${THEME.dim}; }
  h1 { margin: 0; font: 400 ${headingSize(card)}px / 1.04 'Old Standard TT', serif; letter-spacing: -0.02em; }
  h1 span { font-style: italic; color: ${THEME.accent}; }
  p { margin: 26px 0 0; font-size: 26px; line-height: 1.5; color: ${THEME.dim}; max-width: 900px; }
  footer {
    display: flex; align-items: baseline; justify-content: space-between;
    padding-top: 26px; border-top: 1px solid ${THEME.border};
    font-size: 22px; color: ${THEME.dim};
  }
  .mark { font: 400 44px / 1 'Old Standard TT', serif; color: ${THEME.fg}; }
  .mark i { font-style: normal; color: ${THEME.accent}; }
</style>
<div class="eyebrow"><span>${escapeHtml(card.eyebrow)}</span><span>${escapeHtml(card.path)}</span></div>
<div>
  <h1>${escapeHtml(card.heading)}<br /><span>${escapeHtml(card.accent)}</span></h1>
  <p>${escapeHtml(card.line)}</p>
</div>
<footer><span>${DEFAULT_SITE_HOST}</span><span class="mark">h<i>.</i></span></footer>`;
}

async function readFont(file: string): Promise<string> {
  return (await readFile(file)).toString('base64');
}

async function main(): Promise<void> {
  const profile = validate(
    ProfileSchema,
    await readJson('content/profile.json'),
    'content/profile.json',
  );
  const fonts = { normal: await readFont(FONTS.normal), italic: await readFont(FONTS.italic) };
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: WIDTH, height: HEIGHT },
    deviceScaleFactor: 1,
  });
  for (const card of [...cards(profile), ...(await projectCards())]) {
    await page.setContent(cardHtml(card, fonts));
    await page.evaluate(() => document.fonts.ready);
    await writeFile(card.file, await page.screenshot({ type: 'png' }));
    console.warn(`[og] wrote ${card.file}`);
  }
  await browser.close();
}

await main();
