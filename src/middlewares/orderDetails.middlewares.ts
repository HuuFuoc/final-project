import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { ORDER_DETAILS_MESSAGES } from '../constants/messages'

export const createOrderDetailValidator = validate(
  checkSchema(
    {
      order_id: { notEmpty: { errorMessage: ORDER_DETAILS_MESSAGES.INVALID_ORDER_ID }, isMongoId: { errorMessage: ORDER_DETAILS_MESSAGES.INVALID_ORDER_ID } },
      amount: { notEmpty: true, isNumeric: { errorMessage: ORDER_DETAILS_MESSAGES.AMOUNT_MUST_BE_A_NUMBER } }
    },
    ['body']
  )
)

export const updateOrderDetailValidator = validate(
  checkSchema(
    {
      serviceType: { optional: true },
      amount: { optional: true, isNumeric: { errorMessage: ORDER_DETAILS_MESSAGES.AMOUNT_MUST_BE_A_NUMBER } },
      transaction_id: { optional: true, isMongoId: { errorMessage: ORDER_DETAILS_MESSAGES.INVALID_TRANSACTION_ID } }
    },
    ['body']
  )
)

export const orderDetailIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: ORDER_DETAILS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: ORDER_DETAILS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
