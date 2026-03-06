import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { APPOINTMENTS_MESSAGES } from '../constants/messages'

export const createAppointmentValidator = validate(
  checkSchema(
    {
      user_id: { notEmpty: { errorMessage: APPOINTMENTS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: APPOINTMENTS_MESSAGES.INVALID_USER_ID } },
      consultant_id: { notEmpty: { errorMessage: APPOINTMENTS_MESSAGES.INVALID_CONSULTANT_ID }, isMongoId: { errorMessage: APPOINTMENTS_MESSAGES.INVALID_CONSULTANT_ID } },
      scheduledAt: { notEmpty: { errorMessage: APPOINTMENTS_MESSAGES.SCHEDULED_AT_IS_REQUIRED } },
      note: { optional: true }
    },
    ['body']
  )
)

export const updateAppointmentValidator = validate(
  checkSchema(
    {
      status: { optional: true },
      scheduledAt: { optional: true },
      note: { optional: true }
    },
    ['body']
  )
)

export const appointmentIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: APPOINTMENTS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: APPOINTMENTS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
