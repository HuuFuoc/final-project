import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { ORDER_LOGS_MESSAGES } from '../constants/messages'

export const createOrderLogValidator = validate(
  checkSchema(
    {
      order_id: { notEmpty: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_ORDER_ID }, isMongoId: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_ORDER_ID } },
      course_id: { notEmpty: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_COURSE_ID }, isMongoId: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_COURSE_ID } },
      user_id: { notEmpty: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_USER_ID } },
      cart_id: { notEmpty: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_CART_ID }, isMongoId: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_CART_ID } }
    },
    ['body']
  )
)

export const orderLogIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: ORDER_LOGS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
