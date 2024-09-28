import {
  GetQuestionFilter,
  QuestionCreateData,
  QuestionData,
  QuestionRepository,
} from '../repositories/question';

type Config = {
  questionRepository: QuestionRepository;
};

export class QuestionService {
  questionRepository: QuestionRepository;

  constructor({ questionRepository }: Config) {
    this.questionRepository = questionRepository;
  }
  async bulkCreate(questions: QuestionCreateData[]): Promise<QuestionData[]> {
    return this.questionRepository.createMany(questions);
  }
  findAll(
    filter: GetQuestionFilter,
    limit: number,
    offset: number
  ): Promise<QuestionData[]> {
    return this.questionRepository.getAll(filter, limit, offset);
  }
  findAllByIdsList(idsList: string[]): Promise<QuestionData[]> {
    return this.questionRepository.getByIdsList(idsList);
  }
}
