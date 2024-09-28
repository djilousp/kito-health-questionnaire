import { z } from 'zod';
import { objectIdSchema } from './custom.schema';

export const bulkCreateQuestionsSchema = z.object({
  body: z.object({
    questions: z
      .array(
        z.object({
          prompt: z.string(),
          answers: z
            .array(
              z.object({
                answerText: z.string(),
                isCorrect: z.boolean(),
                weight: z.enum(['1', '2', '3']).transform(Number),
              })
            )
            .min(1)
            .refine(
              (answers) =>
                answers.filter((answer) => answer.isCorrect).length === 1,
              {
                message:
                  'There must be exactly one correct answer in the answers array',
                path: ['isCorrect'],
              }
            ),
        })
      )
      .min(2),
  }),
});

export const getQuestionsSchema = z.object({
  query: z.object({
    filter: z
      .object({
        ids: z.array(objectIdSchema).optional(), // Array of ObjectIds, optional
      })
      .optional(),
    limit: z.preprocess(
      (value) => Number(value), // Parse limit as a number
      z.number().min(1, 'Limit must be greater than 0')
    ),
    offset: z.preprocess(
      (value) => Number(value), // Parse offset as a number
      z.number().min(0, 'Offset must be at least 0')
    ),
  }),
});
