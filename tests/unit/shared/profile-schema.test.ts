import { describe, expect, it } from 'vite-plus/test';

import { ProfileSchema } from '#shared/schemas/profile';
import { fixtureCv } from '~~/tests/unit/fixtures/cv';

describe('ProfileSchema', () => {
  it('accepts a profile with or without openToWork', () => {
    const profile = fixtureCv.profile;
    expect(ProfileSchema.parse(profile).openToWork).toBeUndefined();
    expect(ProfileSchema.parse({ ...profile, openToWork: true }).openToWork).toBe(true);
    expect(ProfileSchema.parse({ ...profile, openToWork: false }).openToWork).toBe(false);
  });

  it('rejects a LinkedIn link that is not a full URL', () => {
    const links = { ...fixtureCv.profile.links, linkedin: 'linkedin.com/in/example' };
    expect(() => ProfileSchema.parse({ ...fixtureCv.profile, links })).toThrow(/url/i);
  });
});
