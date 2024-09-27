import type {
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from 'express';
import { StatusCodes } from 'http-status-codes';
import { QuestionnaireError } from '../questionnaire/errors/questionnaire.errors';
import { GenericError } from '../errors/generic.error';

export const errorHandler: ErrorRequestHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any => {
  switch (error.constructor) {
    case QuestionnaireError.QuestionnaireNotFoundError:
      console.error(error.message);
      res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
    case QuestionnaireError.QuestionNotFoundError:
      console.error(error.message);
      return res.status(StatusCodes.NOT_FOUND).json({ message: error.message });

    case GenericError:
      console.error(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });

    default:
      console.error(error.message);
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};
