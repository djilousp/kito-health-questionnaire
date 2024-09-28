import { Router } from 'express';
import { questionController } from '../controllers';
import { tryCatch } from '../../middlewares/utils/tryCatch';
import { Validator } from '../../middlewares/validate';
import {
  bulkCreateQuestionsSchema,
  getQuestionsSchema,
} from '../schemas/question.schema';

const router = Router();

router.post(
  '/bulk-create',
  Validator(bulkCreateQuestionsSchema),
  tryCatch(questionController.bulkCreate)
);

router.get(
  '/',
  Validator(getQuestionsSchema),
  tryCatch(questionController.getQuestions)
);

export default router;
