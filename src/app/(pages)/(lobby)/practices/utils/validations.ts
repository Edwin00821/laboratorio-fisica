import { z } from 'zod';

export const ParabolicShotValidator = z.object({
  v0: z.number().positive(),
  h: z.number().positive(),
  R: z.number().positive(),
});

export type TParabolicShotValidator = z.infer<typeof ParabolicShotValidator>;
