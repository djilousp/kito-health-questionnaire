import { z } from 'zod';
import { ObjectId } from 'mongodb';

export const getQuestionnaireSchema = z.object({
  params: z.object({ id: z.instanceof(ObjectId) }),
});

export const createQuestionnaireSchema = z.object({
  body: z.object({
    questionnaire: z.object({
      title: z.string(),
      description: z.string().optional(),
      questionIds: z.array(z.instanceof(ObjectId)),
    }),
  }),
});

export const takeQuestionnaireSchema = z.object({
  body: z.object({
    answers: z.array(
      z.object({
        questionId: z.instanceof(ObjectId),
        answerId: z.instanceof(ObjectId),
      })
    ),
  }),
});
