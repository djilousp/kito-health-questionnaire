import { QuestionRepository } from '../repositories/question';

type Config = {
  questionRepository: QuestionRepository;
};

export class QuestionService {
  questionRepository: QuestionRepository;

  constructor({ questionRepository }: Config) {
    this.questionRepository = questionRepository;
  }
}
