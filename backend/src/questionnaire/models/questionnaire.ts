import { Schema, model, Document, Types } from 'mongoose';
import { QuestionModel } from './question';

interface Questionnaire extends Document {
  title: string;
  description?: string;
  questions: Types.ObjectId[];
}

const QuestionnaireSchema = new Schema<Questionnaire>({
  title: { type: String, required: true },
  description: { type: String },
  questions: [{ type: Types.ObjectId, ref: QuestionModel, required: true }],
});

export const QuestionnaireModel = model<Questionnaire>(
  'Questionnaire',
  QuestionnaireSchema
);
