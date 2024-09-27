import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const createQuestionnaireSchema = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          title: z.string(),
          description: z.string().optional(),
          questionIds: z.array(z.instanceof(ObjectId)),
        })
      )
      .min(2),
  }),
});
