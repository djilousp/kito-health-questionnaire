import { Router } from 'express';
import { questionnaireController } from '../controllers';
import { tryCatch } from '../../middlewares/utils/tryCatch';
import { Validator } from '../../middlewares/validate';
import {
  createQuestionnaireSchema,
  getQuestionnaireSchema,
  takeQuestionnaireSchema,
} from '../schemas/questionnaire.schema';

const router = Router();

router.post(
  '/',
  Validator(createQuestionnaireSchema),
  tryCatch(questionnaireController.createQuestionnaire)
);

router.get(
  '/:id',
  Validator(getQuestionnaireSchema),
  tryCatch(questionnaireController.getQuestionnaire)
);

router.post(
  '/:id/take',
  Validator(takeQuestionnaireSchema),
  tryCatch(questionnaireController.takeQuestionnaire)
);

export default router;
