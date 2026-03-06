import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { PROGRAMS_MESSAGES } from '../constants/messages'

export const createProgramValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: PROGRAMS_MESSAGES.NAME_IS_REQUIRED },
        isLength: { options: { min: 1, max: 50 }, errorMessage: PROGRAMS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_50 }
      },
      description: { optional: true },
      location: { optional: true },
      type: { optional: true },
      startDate: { notEmpty: { errorMessage: PROGRAMS_MESSAGES.START_DATE_IS_REQUIRED } },
      endDate: { notEmpty: { errorMessage: PROGRAMS_MESSAGES.END_DATE_IS_REQUIRED } },
      programImgUrl: { optional: true }
    },
    ['body']
  )
)

export const updateProgramValidator = validate(
  checkSchema(
    {
      name: { optional: true, isLength: { options: { min: 1, max: 50 }, errorMessage: PROGRAMS_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_50 } },
      description: { optional: true },
      location: { optional: true },
      type: { optional: true },
      startDate: { optional: true },
      endDate: { optional: true },
      programImgUrl: { optional: true }
    },
    ['body']
  )
)

export const programIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: PROGRAMS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: PROGRAMS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
