import { z, ZodType } from 'zod';

export class DestinationValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(255),
    location: z.string().min(1).max(255),
    opening_hours: z.string().max(10).optional(),
    close_hours: z.string().max(10).optional(),
    contact: z.string().max(15).optional(),
    image: z.string().url().optional(),
  });

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive(),
    name: z.string().min(1).max(100).optional(),
    description: z.string().min(1).max(255).optional(),
    location: z.string().min(1).max(255).optional(),
    opening_hours: z.string().max(10).optional(),
    close_hours: z.string().max(10).optional(),
    contact: z.string().max(15).optional(),
    image: z.string().url().optional(),
  });

  static readonly SEARCH: ZodType = z.object({
    name: z.string().min(1).optional(),
    page: z.number().min(1).positive(),
    size: z.number().min(1).max(100).positive(),
  });
}
