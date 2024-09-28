import type { Request, Response } from 'express';
import { QuestionnaireService } from '../services/questionnaire';
import { QuestionService } from '../services/question';
import { QuestionRepository } from '../repositories/question';
import { QuestionnaireRepository } from '../repositories/questionnaire';

const questionRepository = new QuestionRepository();
const questionnaireRepository = new QuestionnaireRepository();
const questionService = new QuestionService({ questionRepository });
const questionnaireService = new QuestionnaireService({
  questionnaireRepository,
  questionService,
});

export const getQuestionnaire = async function getQuestionnaire(
  req: Request,
  res: Response
) {
  const questionnaire = await questionnaireService.findById(req.params.id);

  res.status(200).json(questionnaire);
};

export const createQuestionnaire = async function createQuestionnaire(
  req: Request,
  res: Response
) {
  const questionnaire = await questionnaireService.create(
    req.body.questionnaire
  );

  res.status(200).json(questionnaire);
};

export const takeQuestionnaire = async function takeQuestionnaire(
  req: Request,
  res: Response
) {
  const questionnaireResult = await questionnaireService.take({
    questionnaireId: req.params.id,
    answers: req.body.answers,
  });

  res.status(200).json(questionnaireResult);
};
