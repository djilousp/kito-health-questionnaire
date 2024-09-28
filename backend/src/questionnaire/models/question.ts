import { Schema, model, Document } from 'mongoose';

interface Question extends Document {
  prompt: string;
  answers: {
    answerText: string;
    isCorrect: boolean;
    weight: number;
  }[];
}
interface Answer {
  answerText: string;
  isCorrect: boolean;
  weight: number;
}

const AnswerSchema = new Schema<Answer>({
  answerText: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  weight: { type: Number, enum: [1, 2, 3], required: true },
});

const QuestionSchema = new Schema<Question>({
  prompt: { type: String, required: true },
  answers: [
    {
      answerText: { type: String, required: true },
      isCorrect: { type: Boolean, required: true },
      weight: { type: Number, enum: [1, 2, 3], required: true }, // check where to put the weight !! (answer or question level) and about the values !
    },
  ],
});

AnswerSchema.index(
  { answerText: 1, isCorrect: 1, weight: 1 },
  { unique: true }
);

export const QuestionModel = model<Question>('Question', QuestionSchema);
