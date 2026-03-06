import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { LESSONS_MESSAGES } from '../constants/messages'

export const createLessonValidator = validate(
  checkSchema(
    {
      name: { notEmpty: { errorMessage: LESSONS_MESSAGES.NAME_IS_REQUIRED } },
      session_id: { notEmpty: { errorMessage: LESSONS_MESSAGES.INVALID_SESSION_ID }, isMongoId: { errorMessage: LESSONS_MESSAGES.INVALID_SESSION_ID } },
      course_id: { notEmpty: { errorMessage: LESSONS_MESSAGES.INVALID_COURSE_ID }, isMongoId: { errorMessage: LESSONS_MESSAGES.INVALID_COURSE_ID } },
      user_id: { notEmpty: true, isMongoId: { errorMessage: LESSONS_MESSAGES.INVALID_ID } }
    },
    ['body']
  )
)

export const updateLessonValidator = validate(
  checkSchema(
    {
      name: { optional: true },
      content: { optional: true },
      positionOrder: { optional: true, isNumeric: true }
    },
    ['body']
  )
)

export const lessonIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: LESSONS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: LESSONS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
