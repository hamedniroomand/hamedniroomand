import { describe, expect, it } from 'vite-plus/test';

import { ProjectFrontmatter } from '#shared/schemas/project';

const base = { name: 'Cue', order: 1, tagline: 'Drive agents.', stack: ['TypeScript'] };

describe('ProjectFrontmatter', () => {
  it('accepts a public repo without a site', () => {
    const value = { ...base, repo: 'hamedniroomand/cue' };
    expect(ProjectFrontmatter.parse(value)).toEqual(value);
  });

  it('accepts client work with a site and no repo', () => {
    const value = { ...base, client: 'acme', site: 'https://kitdev.space' };
    expect(ProjectFrontmatter.parse(value)).toEqual(value);
  });

  it('accepts client work with live links and no repo', () => {
    const value = {
      ...base,
      client: 'acme',
      site: 'https://acme.test',
      live: [{ label: 'Flashcards', url: 'https://acme.test/cards' }],
    };
    expect(ProjectFrontmatter.parse(value)).toEqual(value);
  });

  it('rejects a site-only project that is not client work', () => {
    expect(() => ProjectFrontmatter.parse({ ...base, site: 'https://x.test' })).toThrow(
      /client or a public repo/,
    );
  });

  it('rejects an empty live list', () => {
    const client = { ...base, client: 'acme', site: 'https://acme.test' };
    expect(() => ProjectFrontmatter.parse({ ...client, live: [] })).toThrow(/too_small|>=1/i);
  });

  it('rejects a live link that is not an http URL', () => {
    const client = { ...base, client: 'acme', site: 'https://acme.test' };
    for (const url of ['not a url', 'javascript:alert(1)']) {
      expect(() => ProjectFrontmatter.parse({ ...client, live: [{ label: 'x', url }] })).toThrow(
        /url|invalid/i,
      );
    }
  });

  it('rejects a live link without a label', () => {
    const client = { ...base, client: 'acme', site: 'https://acme.test' };
    const live = [{ label: '', url: 'https://acme.test' }];
    expect(() => ProjectFrontmatter.parse({ ...client, live })).toThrow(/too_small|>=1/i);
  });

  it('rejects an unknown key such as a misspelled client', () => {
    const value = { ...base, repo: 'hamedniroomand/cue', clinet: 'acme' };
    expect(() => ProjectFrontmatter.parse(value)).toThrow(/unrecognized/i);
  });

  it('rejects an entry with neither repo nor site', () => {
    expect(() => ProjectFrontmatter.parse(base)).toThrow(/repo or site/);
  });

  it('rejects a malformed repo handle', () => {
    expect(() => ProjectFrontmatter.parse({ ...base, repo: 'not a handle' })).toThrow(
      /regex|invalid/i,
    );
  });
});
