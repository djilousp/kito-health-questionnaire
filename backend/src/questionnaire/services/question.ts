import { safeToJson } from '../../helpers/safeToJson';
import { QuestionModel } from '../models/question';
import { QuestionRepository } from '../repositories/question';

type Config = {
  questionRepository: QuestionRepository;
};
export type QuestionData = {
  _id: string;
  prompt: string;
  answers: {
    answerText: string;
    isCorrect: boolean;
    weight: number;
  }[];
};
export class QuestionService {
  questionRepository: QuestionRepository;

  constructor({ questionRepository }: Config) {
    this.questionRepository = questionRepository;
  }

  async findAllByIdsList(idsList: string[]): Promise<QuestionData> {
    const questions = await QuestionModel.find({ _id: { $in: idsList } });
    return safeToJson(questions);
  }
}
