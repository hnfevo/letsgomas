import { z, ZodType } from 'zod';

export class ArticleValidation {
  static readonly CREATE: ZodType = z.object({
    title: z.string().min(1).max(255),
    content: z.string().min(1).max(10000),
    image: z.string().url().optional(),
    author_name: z.string().min(1).max(100).optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    title: z.string().min(1).max(255).optional(),
    content: z.string().min(1).max(10000).optional(),
    image: z.string().url().optional(),
    author_name: z.string().min(1).max(100).optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    title: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
