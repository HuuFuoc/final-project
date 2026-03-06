import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { SESSIONS_MESSAGES } from '../constants/messages'

export const createSessionValidator = validate(
  checkSchema(
    {
      name: { notEmpty: { errorMessage: SESSIONS_MESSAGES.NAME_IS_REQUIRED } },
      course_id: { notEmpty: { errorMessage: SESSIONS_MESSAGES.INVALID_COURSE_ID }, isMongoId: { errorMessage: SESSIONS_MESSAGES.INVALID_COURSE_ID } },
      user_id: { notEmpty: { errorMessage: SESSIONS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: SESSIONS_MESSAGES.INVALID_USER_ID } }
    },
    ['body']
  )
)

export const updateSessionValidator = validate(
  checkSchema(
    {
      name: { optional: true },
      content: { optional: true },
      positionOrder: { optional: true }
    },
    ['body']
  )
)

export const sessionIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: SESSIONS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: SESSIONS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
