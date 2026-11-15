import { resolve } from 'node:path';

import { describe, expect, it } from 'vite-plus/test';

import { parseExtensions } from '#shared/cv/extensions';
import { projectStory } from '#shared/public-site';
import type { LoadDeps } from '~~/modules/cv-content/load';
import { loadContent } from '~~/modules/cv-content/load';

const dir = resolve('content');
const deps: LoadDeps = {
  fetchReadme: async () => null,
  fetchLlms: async () => null,
  fetchGist: async () => null,
  highlight: code => code,
};

describe('content rules', () => {
  it('keeps Team Lead out of the headline texts', async () => {
    const { profile, about } = await loadContent(dir, deps);
    const headline = [
      profile.title,
      profile.tagline ?? '',
      profile.summary,
      profile.description,
      about.body,
    ].join('\n');
    expect(headline).not.toMatch(/team lead/i);
  });

  // This rule reads the résumé sections. It does not read the projects and the dotfiles.
  it('keeps the Full-stack label out of the résumé content', async () => {
    const { profile, about, skills, education, experience } = await loadContent(dir, deps);
    const text = JSON.stringify({ profile, about, skills, education, experience });
    expect(text).not.toMatch(/full[- ]?stack/i);
  });

  it('has no design-pattern name-dropping in highlights', async () => {
    const cv = await loadContent(dir, deps);
    const text = cv.experience
      .flatMap(e => e.highlights.map(h => h.body))
      .join('\n')
      .toLowerCase();
    for (const word of [
      'singleton',
      'factory pattern',
      'observer pattern',
      'solid principles',
      'clean architecture',
    ])
      expect(text).not.toContain(word);
  });

  // `vp fmt` once read these bodies as prose and flattened them. `fmt.ignorePatterns` in
  // vite.config.ts stops that, and the next two rules fail if it starts again.
  it('keeps the indentation of the committed dotfile bodies', async () => {
    const cv = await loadContent(dir, deps);
    // A `text` file is a flat list, so it has no indentation to lose.
    for (const dotfile of cv.dotfiles.filter(entry => entry.lang !== 'text')) {
      const lines = dotfile.content.split('\n');
      expect(
        lines.some(line => /^\s+\S/.test(line)),
        dotfile.slug,
      ).toBe(true);
    }
  });

  it('keeps one entry per line in the committed list dotfiles', async () => {
    const cv = await loadContent(dir, deps);
    const lists = cv.dotfiles.filter(entry => entry.registry !== undefined);
    expect(lists.length).toBeGreaterThan(0);
    for (const dotfile of lists) {
      const lines = dotfile.content.trim().split('\n');
      expect(lines.length, dotfile.slug).toBeGreaterThan(5);
      expect(parseExtensions(dotfile.content), dotfile.slug).toHaveLength(lines.length);
    }
  });

  it('orders experience newest first by the order field', async () => {
    const cv = await loadContent(dir, deps);
    const orders = cv.experience.map(e => e.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
  });

  it('has a written story for each project', async () => {
    const cv = await loadContent(dir, deps);
    for (const project of cv.projects)
      expect(projectStory(project).sections, project.slug).toHaveLength(3);
  });
});
