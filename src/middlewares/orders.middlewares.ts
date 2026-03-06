import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { ORDERS_MESSAGES } from '../constants/messages'

export const createOrderValidator = validate(
  checkSchema(
    {
      cart_id: { notEmpty: { errorMessage: ORDERS_MESSAGES.INVALID_CART_ID }, isMongoId: { errorMessage: ORDERS_MESSAGES.INVALID_CART_ID } },
      totalAmount: { notEmpty: { errorMessage: ORDERS_MESSAGES.TOTAL_AMOUNT_IS_REQUIRED }, isNumeric: { errorMessage: ORDERS_MESSAGES.TOTAL_AMOUNT_MUST_BE_POSITIVE } }
    },
    ['body']
  )
)

export const updateOrderStatusValidator = validate(
  checkSchema(
    {
      status: { notEmpty: true }
    },
    ['body']
  )
)

export const orderIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: ORDERS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: ORDERS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
