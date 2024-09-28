import { QuestionnaireError } from '../errors/questionnaire.errors';
import {
  QuestionnaireCreateData,
  QuestionnaireData,
  QuestionnaireRepository,
} from '../repositories/questionnaire';
import { QuestionService } from './question';
import { QuestionData } from '../repositories/question';

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

  async take(answersInput: AnswersAttempt): Promise<{
    correctlyAnsweredQuestions: QuestionData[];
    wronglyAnsweredQuestions: QuestionData[];
    score: number;
  }> {
    const { questionnaireId, answers } = answersInput;
    const questionnaire = await this.findById(questionnaireId);
    const questions = await this.questionService.findAllByIdsList(
      questionnaire.questions
    );

    const correctlyAnsweredQuestions: QuestionData[] = [];
    const wronglyAnsweredQuestions: QuestionData[] = [];
    let score = 0;
    answers.map((answer) => {
      const question = questions.find(
        (question) => question._id.toString() === answer.questionId
      );
      if (question) {
        const correctAnswer = question.answers.find((answr) => answr.isCorrect);
        if (correctAnswer && correctAnswer._id.toString() === answer.answerId) {
          correctlyAnsweredQuestions.push(question);
          score += correctAnswer.weight;
        } else {
          wronglyAnsweredQuestions.push(question);
        }
      }
    });

    return {
      correctlyAnsweredQuestions,
      wronglyAnsweredQuestions,
      score,
    };
  }
}
