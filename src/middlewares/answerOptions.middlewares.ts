import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { ANSWER_OPTIONS_MESSAGES } from '../constants/messages'

export const createAnswerOptionValidator = validate(
  checkSchema(
    {
      question_id: { notEmpty: { errorMessage: ANSWER_OPTIONS_MESSAGES.INVALID_QUESTION_ID }, isMongoId: { errorMessage: ANSWER_OPTIONS_MESSAGES.INVALID_QUESTION_ID } },
      optionContent: { notEmpty: { errorMessage: ANSWER_OPTIONS_MESSAGES.OPTION_CONTENT_IS_REQUIRED } },
      score: { optional: true, isNumeric: { errorMessage: ANSWER_OPTIONS_MESSAGES.SCORE_MUST_BE_A_NUMBER } },
      positionOrder: { optional: true, isNumeric: { errorMessage: ANSWER_OPTIONS_MESSAGES.POSITION_ORDER_MUST_BE_A_NUMBER } }
    },
    ['body']
  )
)

export const updateAnswerOptionValidator = validate(
  checkSchema(
    {
      optionContent: { optional: true },
      score: { optional: true, isNumeric: { errorMessage: ANSWER_OPTIONS_MESSAGES.SCORE_MUST_BE_A_NUMBER } },
      positionOrder: { optional: true, isNumeric: { errorMessage: ANSWER_OPTIONS_MESSAGES.POSITION_ORDER_MUST_BE_A_NUMBER } }
    },
    ['body']
  )
)

export const answerOptionIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: ANSWER_OPTIONS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: ANSWER_OPTIONS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
