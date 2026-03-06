import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { REVIEWS_MESSAGES } from '../constants/messages'

export const createReviewValidator = validate(
  checkSchema(
    {
      rating: {
        notEmpty: { errorMessage: REVIEWS_MESSAGES.RATING_IS_REQUIRED },
        isNumeric: { errorMessage: REVIEWS_MESSAGES.RATING_MUST_BE_A_NUMBER }
      },
      course_id: { notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_COURSE_ID }, isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_COURSE_ID } },
      user_id: { notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_USER_ID } }
    },
    ['body']
  )
)

export const updateReviewValidator = validate(
  checkSchema(
    {
      rating: { optional: true, isNumeric: { errorMessage: REVIEWS_MESSAGES.RATING_MUST_BE_A_NUMBER } },
      comment: { optional: true }
    },
    ['body']
  )
)

export const reviewIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
