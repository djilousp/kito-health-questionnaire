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
    const result = await QuestionnaireModel.findById(id).populate('questions');
    const questionnaire = safeToJson(result);
    const questions = questionnaire.questions.map((question) => {
      const answersWithoutCorrectBool = question.answers.map((answer) => ({
        _id: answer._id,
        answerText: answer.answerText,
      }));
      return { ...question, answers: answersWithoutCorrectBool };
    });
    console.log('new shape of questions', questions);
    return { ...questionnaire, questions };
  }
}
