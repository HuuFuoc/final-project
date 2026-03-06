import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { SURVEY_RESULTS_MESSAGES } from '../constants/messages'

export const createSurveyResultValidator = validate(
  checkSchema(
    {
      user_id: { notEmpty: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_USER_ID } },
      survey_id: { notEmpty: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_SURVEY_ID }, isMongoId: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_SURVEY_ID } },
      program_id: { notEmpty: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_PROGRAM_ID }, isMongoId: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_PROGRAM_ID } },
      totalScore: { optional: true, isNumeric: { errorMessage: SURVEY_RESULTS_MESSAGES.TOTAL_SCORE_MUST_BE_A_NUMBER } },
      riskLevel: { optional: true }
    },
    ['body']
  )
)

export const surveyResultIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: SURVEY_RESULTS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
