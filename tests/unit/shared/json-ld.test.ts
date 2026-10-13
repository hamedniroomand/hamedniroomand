import { describe, expect, it } from 'vite-plus/test';

import { personJsonLd } from '#shared/cv/json-ld';
import { fixtureCv } from '~~/tests/unit/fixtures/cv';

describe('personJsonLd', () => {
  it('describes the profile as a schema.org Person', () => {
    const data = personJsonLd(fixtureCv, 'https://hamed.test');

    expect(data).toMatchObject({
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: fixtureCv.profile.name,
      jobTitle: fixtureCv.profile.title,
      url: 'https://hamed.test',
      email: 'mailto:me@example.com',
      sameAs: ['https://github.com/hamedniroomand', 'https://linkedin.com/in/example'],
      address: { '@type': 'PostalAddress', addressLocality: 'Yerevan', addressCountry: 'Armenia' },
      knowsLanguage: ['Persian', 'English'],
    });
  });

  it('names no employer when every role has ended', () => {
    expect(personJsonLd(fixtureCv, 'https://hamed.test').worksFor).toBeUndefined();
  });

  it('names the employer of an open role', () => {
    const open = {
      ...fixtureCv.experience[1]!,
      roles: [{ title: 'Developer', start: '2026-09', end: 'present' as const }],
    };
    const cv = { ...fixtureCv, experience: [fixtureCv.experience[0]!, open] };
    expect(personJsonLd(cv, 'https://hamed.test').worksFor).toEqual({
      '@type': 'Organization',
      name: 'Globex',
    });
  });

  it('omits the email when it is not an address', () => {
    const cv = {
      ...fixtureCv,
      profile: { ...fixtureCv.profile, links: { ...fixtureCv.profile.links, email: 'hidden' } },
    };

    expect(personJsonLd(cv, 'https://hamed.test').email).toBeUndefined();
  });
});
