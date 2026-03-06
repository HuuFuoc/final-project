import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { USER_ANSWER_LOGS_MESSAGES } from '../constants/messages'

export const createUserAnswerLogValidator = validate(
  checkSchema(
    {
      survey_result_id: { notEmpty: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_SURVEY_RESULT_ID }, isMongoId: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_SURVEY_RESULT_ID } },
      question_id: { notEmpty: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_QUESTION_ID }, isMongoId: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_QUESTION_ID } },
      answer_option_id: { notEmpty: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_ANSWER_OPTION_ID }, isMongoId: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_ANSWER_OPTION_ID } },
      program_id: { notEmpty: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_PROGRAM_ID }, isMongoId: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_PROGRAM_ID } },
      answerValue: { optional: true },
      score: { optional: true, isNumeric: { errorMessage: USER_ANSWER_LOGS_MESSAGES.SCORE_MUST_BE_A_NUMBER } }
    },
    ['body']
  )
)

export const userAnswerLogIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: USER_ANSWER_LOGS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
