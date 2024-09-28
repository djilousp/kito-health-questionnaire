import { QuestionModel } from '../models/question';
import { InsertableDocument } from '../../helpers/types-helper';
import { safeToJson } from '../../helpers/safeToJson';

export type QuestionnaireData = {
  _id: string;
  description?: string | null;
  questions: string[];
};

export type QuestionnaireCreateData = InsertableDocument<
  QuestionnaireData,
  '_id'
>;

export class QuestionnaireRepository {
  async create(
    questionnaireInput: QuestionnaireCreateData
  ): Promise<QuestionnaireData> {
    const questionnaire = await QuestionModel.insertMany([questionnaireInput]);
    return safeToJson(questionnaire);
  }

  async getById(id: string): Promise<QuestionnaireData | null> {
    const result = await QuestionModel.findById(id);
    return safeToJson(result);
  }
}
