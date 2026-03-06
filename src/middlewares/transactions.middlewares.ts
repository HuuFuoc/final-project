import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { TRANSACTIONS_MESSAGES } from '../constants/messages'

export const createTransactionValidator = validate(
  checkSchema(
    {
      consultant_id: { notEmpty: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_CONSULTANT_ID }, isMongoId: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_CONSULTANT_ID } },
      amount: { notEmpty: { errorMessage: TRANSACTIONS_MESSAGES.AMOUNT_MUST_BE_A_NUMBER }, isNumeric: { errorMessage: TRANSACTIONS_MESSAGES.AMOUNT_MUST_BE_POSITIVE } },
      status: { optional: true },
      serviceType: { optional: true },
      payment_id: { optional: true, isMongoId: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_PAYMENT_ID } },
      course_id: { optional: true, isMongoId: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_COURSE_ID } },
      program_id: { optional: true, isMongoId: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_PROGRAM_ID } }
    },
    ['body']
  )
)

export const updateTransactionValidator = validate(
  checkSchema(
    {
      amount: { optional: true, isNumeric: { errorMessage: TRANSACTIONS_MESSAGES.AMOUNT_MUST_BE_A_NUMBER } },
      status: { optional: true }
    },
    ['body']
  )
)

export const transactionIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: TRANSACTIONS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
