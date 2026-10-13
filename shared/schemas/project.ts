import { z } from 'zod';

import { ToolCatalogSchema } from '../cv/tool-catalog.ts';
import { RenderedBody } from './common.ts';

export const ProjectFrontmatter = z
  .strictObject({
    name: z.string().min(1),
    order: z.number().int(),
    client: z.string().min(1).optional(),
    live: z
      .array(
        z.strictObject({
          label: z.string().min(1),
          url: z
            .string()
            .url()
            .regex(/^https?:\/\//),
        }),
      )
      .min(1)
      .optional(),
    repo: z
      .string()
      .regex(/^[\w.-]+\/[\w.-]+$/)
      .optional(),
    site: z.string().url().optional(),
    docs: z.string().url().optional(),
    tagline: z.string().min(1),
    stack: z.array(z.string()),
    screenshots: z
      .array(
        z.object({
          src: z.string().startsWith('/'),
          alt: z.string().min(1),
          caption: z.string().min(1),
          width: z.number().int().positive(),
          height: z.number().int().positive(),
          frame: z.string().min(1).optional(),
        }),
      )
      .min(1)
      .optional(),
  })
  .refine(value => value.repo !== undefined || value.site !== undefined, {
    message: 'a project needs a repo or site link',
    path: ['repo'],
  })
  .refine(value => value.client !== undefined || value.repo !== undefined, {
    message: 'a project needs a client or a public repo',
    path: ['client'],
  });

export const ProjectSchema = ProjectFrontmatter.safeExtend({
  slug: z.string(),
  readmeSource: z.enum(['github', 'fallback']),
  /** Read from the live site at build time, so the list is never out of date. */
  tools: ToolCatalogSchema.optional(),
}).safeExtend(RenderedBody.shape);
export type Project = z.infer<typeof ProjectSchema>;
