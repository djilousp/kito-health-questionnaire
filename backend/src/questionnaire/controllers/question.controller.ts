import type { Request, Response } from 'express';
import { QuestionService } from '../services/question';
import { QuestionRepository } from '../repositories/question';

const questionRepository = new QuestionRepository();
const questionService = new QuestionService({ questionRepository });

export const bulkCreate = async function bulkCreate(
  req: Request,
  res: Response
) {
  const questions = await questionService.bulkCreate(req.body.questions);

  res.status(200).json(questions);
};

export const getQuestions = async function (req: Request, res: Response) {
  const { filter, limit, offset }: any = req.query;
  const questions = await questionService.findAll(filter ?? {}, limit, offset);

  res.status(200).json(questions);
};
