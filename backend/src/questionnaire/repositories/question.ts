import { safeToJson } from '../../helpers/safeToJson';
import { QuestionModel } from '../models/question';
import { InsertableDocument } from 'src/helpers/types-helper';

export type QuestionData = {
  _id: string;
  prompt: string;
  answers: {
    _id: string;
    answerText: string;
    isCorrect: boolean;
    weight: number;
  }[];
};

export type QuestionCreateData = InsertableDocument<QuestionData, '_id'>;
export type GetQuestionFilter = {
  ids?: string[];
};

export class QuestionRepository {
  async createMany(
    questionsInput: QuestionCreateData[]
  ): Promise<QuestionData[]> {
    const createdQuestions = await QuestionModel.insertMany(questionsInput);
    return safeToJson(createdQuestions);
  }
  async getByIdsList(idsList: string[]): Promise<QuestionData[]> {
    const questions = await QuestionModel.find({ _id: { $in: idsList } });

    return safeToJson(questions);
  }

  async getAll(
    filter: GetQuestionFilter,
    limit: number,
    offset: number
  ): Promise<QuestionData[]> {
    const queryObject: any = {};
    if (filter.ids) {
      queryObject._id['$in'].push(filter.ids);
    }
    const questions = await QuestionModel.find(queryObject)
      .skip(offset)
      .limit(limit);
    return safeToJson(questions);
  }
}
