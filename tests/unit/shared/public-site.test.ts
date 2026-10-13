import { describe, expect, it } from 'vite-plus/test';

import { projectGroups, projectStory } from '#shared/public-site';

describe('projectStory', () => {
  it('returns the written story for a known project', () => {
    const story = projectStory({ slug: 'cue', tagline: 'x' });
    expect(story.headline).toBe('From an issue to a reviewed pull request.');
    expect(story.sections.length).toBeGreaterThan(0);
  });

  it('tells the Jack Westin story as client work', () => {
    const story = projectStory({ slug: 'jack-westin', tagline: 'x' });
    expect(story.category).toBe('Client work / EdTech');
    expect(story.headline).toBe('Study tools behind 500K+ student accounts.');
    expect(story.sections.map(section => section.title)).toEqual([
      'Practice that feels like the real test',
      'An AI tutor inside the product',
      'One design system, four apps',
    ]);
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

describe('projectGroups', () => {
  it('splits client work from open source and keeps the order inside each group', () => {
    const projects = [{ slug: 'a' }, { slug: 'b', client: 'acme' }, { slug: 'c' }];
    const groups = projectGroups(projects);
    expect(groups.client.map(project => project.slug)).toEqual(['b']);
    expect(groups.openSource.map(project => project.slug)).toEqual(['a', 'c']);
  });
});
