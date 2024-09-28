import { z } from 'zod';
import { objectIdSchema } from './custom.schema';

export const getQuestionnaireSchema = z.object({
  params: z.object({ id: objectIdSchema }),
});

export const createQuestionnaireSchema = z.object({
  body: z.object({
    questionnaire: z.object({
      title: z.string(),
      description: z.string().optional(),
      questions: z.array(objectIdSchema).min(1),
    }),
  }),
});

export const takeQuestionnaireSchema = z.object({
  params: z.object({ id: objectIdSchema }),
  body: z.object({
    answers: z.array(
      z.object({
        questionId: objectIdSchema,
        answerId: objectIdSchema,
      })
    ),
  }),
});
