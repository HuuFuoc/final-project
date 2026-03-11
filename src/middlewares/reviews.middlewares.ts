import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { REVIEWS_MESSAGES } from '../constants/messages'

const ratingSchema = {
  notEmpty: { errorMessage: REVIEWS_MESSAGES.RATING_IS_REQUIRED },
  isNumeric: { errorMessage: REVIEWS_MESSAGES.RATING_MUST_BE_A_NUMBER },
  custom: {
    options: (value: number) => value >= 1 && value <= 5,
    errorMessage: REVIEWS_MESSAGES.RATING_MUST_BE_FROM_1_TO_5
  }
}

export const createCourseReviewValidator = validate(
  checkSchema(
    {
      rating: ratingSchema,
      course_id: { notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_COURSE_ID }, isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_COURSE_ID } },
      user_id: { notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_USER_ID } }
    },
    ['body']
  )
)

export const createAppointmentReviewValidator = validate(
  checkSchema(
    {
      rating: ratingSchema,
      appointment_id: {
        notEmpty: { errorMessage: 'Invalid appointment id' },
        isMongoId: { errorMessage: 'Invalid appointment id' }
      },
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

export const courseIdValidator = validate(
  checkSchema(
    {
      courseId: {
        notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_COURSE_ID },
        isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_COURSE_ID }
      }
    },
    ['params']
  )
)

export const userIdValidator = validate(
  checkSchema(
    {
      userId: {
        notEmpty: { errorMessage: REVIEWS_MESSAGES.INVALID_USER_ID },
        isMongoId: { errorMessage: REVIEWS_MESSAGES.INVALID_USER_ID }
      }
    },
    ['params']
  )
)