import { InsertableDocument } from '../../helpers/types-helper';
import { safeToJson } from '../../helpers/safeToJson';
import { QuestionnaireModel } from '../models/questionnaire';

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
    const questionnaire = await QuestionnaireModel.insertMany([
      questionnaireInput,
    ]);
    return safeToJson(questionnaire);
  }

  async getById(id: string): Promise<QuestionnaireData | null> {
    const result = await QuestionnaireModel.findById(id);
    return safeToJson(result);
  }
}
