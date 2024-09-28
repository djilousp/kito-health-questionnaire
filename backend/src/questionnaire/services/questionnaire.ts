import * as _ from 'lodash';
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
  questionnaireId: string;
  answers: {
    questionId: string;
    answerId: string;
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

  async findById(id: string): Promise<QuestionnaireData> {
    const questionnaire = await this.questionnaireRepository.getById(id);
    if (!questionnaire) {
      throw QuestionnaireError.QuestionnaireNotFoundError.byId(id);
    }
    return questionnaire;
  }

  async take(answersInput: AnswersAttempt): Promise<number> {
    const { questionnaireId, answers } = answersInput;
    const questionnaire = await this.findById(questionnaireId);
    const questions = await this.questionService.findAllByIdsList(
      questionnaire.questions
    );

    const correctAnswers = [];
    const incorrectAnswers = [];
    const filteredAnswers = _.intersectionWith(
      answersInput.answers,
      questions,
      (answer, question) => {
        answer.questionId === question._id.toString();
      }
    );
    return 0;
  }
}
