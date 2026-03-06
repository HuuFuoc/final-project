import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { CARTS_MESSAGES } from '../constants/messages'

export const addToCartValidator = validate(
  checkSchema(
    {
      course_id: { notEmpty: { errorMessage: CARTS_MESSAGES.INVALID_COURSE_ID }, isMongoId: { errorMessage: CARTS_MESSAGES.INVALID_COURSE_ID } },
      user_id: { notEmpty: { errorMessage: CARTS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: CARTS_MESSAGES.INVALID_USER_ID } }
    },
    ['body']
  )
)

export const updateCartValidator = validate(
  checkSchema(
    {
      status: { optional: true },
      price: { optional: true, isNumeric: { errorMessage: CARTS_MESSAGES.INVALID_ID } },
      discount: { optional: true, isNumeric: true }
    },
    ['body']
  )
)

export const cartIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: CARTS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: CARTS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
