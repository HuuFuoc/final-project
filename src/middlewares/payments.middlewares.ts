import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { PAYMENTS_MESSAGES } from '../constants/messages'

export const createPaymentValidator = validate(
  checkSchema(
    {
      user_id: { notEmpty: { errorMessage: PAYMENTS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: PAYMENTS_MESSAGES.INVALID_USER_ID } },
      paymentNo: { notEmpty: { errorMessage: PAYMENTS_MESSAGES.PAYMENT_NO_IS_REQUIRED } },
      amount: { notEmpty: { errorMessage: PAYMENTS_MESSAGES.AMOUNT_MUST_BE_A_NUMBER }, isNumeric: { errorMessage: PAYMENTS_MESSAGES.AMOUNT_MUST_BE_POSITIVE } },
      paymentMethod: { optional: true },
      organizationShare: { optional: true, isNumeric: true },
      consultantShare: { optional: true, isNumeric: true }
    },
    ['body']
  )
)

export const updatePaymentStatusValidator = validate(
  checkSchema(
    {
      status: { notEmpty: true }
    },
    ['body']
  )
)

export const paymentIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: PAYMENTS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: PAYMENTS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
