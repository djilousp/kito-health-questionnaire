import type { ObjectId } from 'mongoose';
import { QuestionnaireError } from '../errors/questionnaire.errors';
import {
  QuestionnaireCreateData,
  QuestionnaireData,
  QuestionnaireRepository,
} from '../repositories/questionnaire';
import { QuestionService } from './question';

type Config = {
  questionnaireRepository: QuestionnaireRepository;
  questionService: QuestionService;
};

type AnswersAttempt = {
  questionnaireId: ObjectId;
  answers: {
    questionId: ObjectId;
    answerId: ObjectId;
  }[];
};
export class QuestionnaireService {
  questionnaireRepository: QuestionnaireRepository;
  questionService: QuestionService;

  constructor({ questionnaireRepository, questionService }: Config) {
    this.questionnaireRepository = questionnaireRepository;
    this.questionService = questionService;
  }

  async create(
    questionnaireInput: QuestionnaireCreateData
  ): Promise<QuestionnaireData> {
    return this.questionnaireRepository.create(questionnaireInput);
  }

  async findById(id: string): Promise<any> {
    const questionnaire = await this.questionnaireRepository.getById(id);
    if (!questionnaire) {
      throw QuestionnaireError.QuestionnaireNotFoundError.byId(id);
    }
    return questionnaire;
  }

  async take(answersInput: AnswersAttempt): Promise<number> {
    return 0;
  }
}
