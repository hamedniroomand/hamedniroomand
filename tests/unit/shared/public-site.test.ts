import { describe, expect, it } from 'vite-plus/test';

import { homeProjects, projectStory } from '#shared/public-site';

describe('projectStory', () => {
  it('returns the written story for a known project', () => {
    const story = projectStory({ slug: 'cue', tagline: 'x' });
    expect(story.headline).toBe('From an issue to a reviewed pull request.');
    expect(story.sections.length).toBeGreaterThan(0);
  });

  it('falls back to the tagline for an unknown project', () => {
    expect(projectStory({ slug: 'none', tagline: 'A tool.' })).toEqual({
      category: 'Project',
      headline: 'A tool.',
      introduction: 'A tool.',
      sections: [],
    });
  });
});

describe('homeProjects', () => {
  it('keeps only the projects marked for the home page, in their order', () => {
    const projects = [{ slug: 'a', home: true }, { slug: 'b' }, { slug: 'c', home: true }];
    expect(homeProjects(projects).map(project => project.slug)).toEqual(['a', 'c']);
  });
});
