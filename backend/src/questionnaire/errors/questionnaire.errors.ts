import { EntityError } from '../../errors/base.error';

export namespace QuestionnaireError {
  export class QuestionnaireNotFoundError extends EntityError {
    static byId(id: string): QuestionnaireNotFoundError {
      return new QuestionnaireNotFoundError(
        'Questionnaire',
        `No Questionnaire found id: ${id}`
      );
    }
  }

  export class InvalidQuestionnaireError extends EntityError {}

  export class QuestionNotFoundError extends EntityError {
    static byId(id: string): QuestionnaireNotFoundError {
      return new QuestionnaireNotFoundError(
        'Question',
        `No Question found id: ${id}`
      );
    }
  }

  export class InvalidQuestionError extends EntityError {}
}
