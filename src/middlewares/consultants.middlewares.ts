import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { CONSULTANTS_MESSAGES } from '../constants/messages'

export const createConsultantValidator = validate(
  checkSchema(
    {
      user_id: { notEmpty: { errorMessage: CONSULTANTS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: CONSULTANTS_MESSAGES.INVALID_USER_ID } },
      fullName: { notEmpty: { errorMessage: CONSULTANTS_MESSAGES.FULL_NAME_IS_REQUIRED } },
      email: { notEmpty: { errorMessage: CONSULTANTS_MESSAGES.EMAIL_IS_REQUIRED }, isEmail: { errorMessage: CONSULTANTS_MESSAGES.EMAIL_IS_INVALID } }
    },
    ['body']
  )
)

export const updateConsultantValidator = validate(
  checkSchema(
    {
      fullName: { optional: true },
      email: { optional: true, isEmail: { errorMessage: CONSULTANTS_MESSAGES.EMAIL_IS_INVALID } },
      jobTitle: { optional: true },
      salary: { optional: true, isNumeric: true },
      status: { optional: true }
    },
    ['body']
  )
)

export const consultantIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: CONSULTANTS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: CONSULTANTS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
