import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { SURVEYS_MESSAGES } from '../constants/messages'

export const createSurveyValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: SURVEYS_MESSAGES.NAME_IS_REQUIRED },
        isLength: { options: { min: 1, max: 100 }, errorMessage: SURVEYS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100 }
      },
      description: { optional: true },
      type: { optional: true }
    },
    ['body']
  )
)

export const updateSurveyValidator = validate(
  checkSchema(
    {
      name: { optional: true, isLength: { options: { min: 1, max: 100 }, errorMessage: SURVEYS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_100 } },
      description: { optional: true },
      type: { optional: true }
    },
    ['body']
  )
)

export const surveyIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: SURVEYS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: SURVEYS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
