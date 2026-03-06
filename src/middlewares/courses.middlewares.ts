import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { COURSES_MESSAGES } from '../constants/messages'

export const createCourseValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: COURSES_MESSAGES.NAME_IS_REQUIRED },
        isString: { errorMessage: COURSES_MESSAGES.NAME_MUST_BE_A_STRING }
      },
      slug: { notEmpty: { errorMessage: COURSES_MESSAGES.SLUG_IS_REQUIRED } },
      user_id: { notEmpty: { errorMessage: COURSES_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: COURSES_MESSAGES.INVALID_USER_ID } },
      category_id: { notEmpty: { errorMessage: COURSES_MESSAGES.INVALID_CATEGORY_ID }, isMongoId: { errorMessage: COURSES_MESSAGES.INVALID_CATEGORY_ID } },
      price: { optional: true, isNumeric: { errorMessage: COURSES_MESSAGES.PRICE_MUST_BE_A_NUMBER } }
    },
    ['body']
  )
)

export const updateCourseValidator = validate(
  checkSchema(
    {
      name: { optional: true, isString: { errorMessage: COURSES_MESSAGES.NAME_MUST_BE_A_STRING } },
      slug: { optional: true },
      price: { optional: true, isNumeric: { errorMessage: COURSES_MESSAGES.PRICE_MUST_BE_A_NUMBER } }
    },
    ['body']
  )
)

export const courseIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: COURSES_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: COURSES_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
