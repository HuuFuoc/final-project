import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { QUESTIONS_MESSAGES } from '../constants/messages'

export const createQuestionValidator = validate(
  checkSchema(
    {
      survey_id: { notEmpty: { errorMessage: QUESTIONS_MESSAGES.INVALID_SURVEY_ID }, isMongoId: { errorMessage: QUESTIONS_MESSAGES.INVALID_SURVEY_ID } },
      questionContent: { notEmpty: { errorMessage: QUESTIONS_MESSAGES.QUESTION_CONTENT_IS_REQUIRED } },
      questionType: { optional: true },
      positionOrder: { optional: true, isNumeric: true }
    },
    ['body']
  )
)

export const updateQuestionValidator = validate(
  checkSchema(
    {
      questionContent: { optional: true },
      questionType: { optional: true },
      positionOrder: { optional: true, isNumeric: true }
    },
    ['body']
  )
)

export const questionIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: QUESTIONS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: QUESTIONS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
