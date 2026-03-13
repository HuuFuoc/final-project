import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { INSTRUCTORS_MESSAGES } from '../constants/messages'

export const becomeInstructorValidator = validate(
  checkSchema(
    {
      fullName: {
        optional: true,
        isString: { errorMessage: INSTRUCTORS_MESSAGES.FULL_NAME_IS_REQUIRED },
        trim: true
      },
      email: {
        optional: true,
        isEmail: { errorMessage: INSTRUCTORS_MESSAGES.EMAIL_IS_INVALID },
        trim: true
      },
      phoneNumber: {
        optional: true,
        isString: { errorMessage: 'Phone number must be a string' },
        trim: true
      },
      qualifications: {
        optional: true,
        isArray: { errorMessage: 'Qualifications must be an array of strings' }
      },
      'qualifications.*': {
        optional: true,
        isString: { errorMessage: 'Each qualification must be a string' },
        trim: true
      },
      jobTitle: {
        optional: true,
        isString: { errorMessage: 'Job title must be a string' },
        trim: true
      },
      profilePicUrl: {
        optional: true,
        isString: { errorMessage: 'Profile picture url must be a string' },
        trim: true
      },
      note: {
        optional: true,
        isString: { errorMessage: 'Note must be a string' },
        trim: true
      }
    },
    ['body']
  )
)

export const updateInstructorValidator = validate(
  checkSchema(
    {
      fullName: { optional: true, isString: true, trim: true },
      email: { optional: true, isEmail: { errorMessage: INSTRUCTORS_MESSAGES.EMAIL_IS_INVALID }, trim: true },
      phoneNumber: { optional: true, isString: true, trim: true },
      qualifications: { optional: true, isArray: true },
      'qualifications.*': { optional: true, isString: true, trim: true },
      jobTitle: { optional: true, isString: true, trim: true },
      hireDate: { optional: true, isISO8601: true },
      salary: { optional: true, isNumeric: true },
      profilePicUrl: { optional: true, isString: true, trim: true }
    },
    ['body']
  )
)

export const instructorIdValidator = validate(
  checkSchema(
    {
      instructorId: {
        notEmpty: { errorMessage: INSTRUCTORS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: INSTRUCTORS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)

export const instructorRequestIdValidator = validate(
  checkSchema(
    {
      requestId: {
        notEmpty: { errorMessage: INSTRUCTORS_MESSAGES.INVALID_REQUEST_ID },
        isMongoId: { errorMessage: INSTRUCTORS_MESSAGES.INVALID_REQUEST_ID }
      }
    },
    ['params']
  )
)

export const instructorRequestStatusValidator = validate(
  checkSchema(
    {
      status: {
        optional: true,
        isIn: {
          options: [['pending', 'approved', 'rejected']],
          errorMessage: INSTRUCTORS_MESSAGES.STATUS_IS_INVALID
        }
      }
    },
    ['query']
  )
)

export const reviewInstructorRequestValidator = validate(
  checkSchema(
    {
      decision: {
        notEmpty: { errorMessage: INSTRUCTORS_MESSAGES.DECISION_IS_REQUIRED },
        isIn: {
          options: [['approve', 'accept', 'reject', 'deny', 'denied']],
          errorMessage: INSTRUCTORS_MESSAGES.DECISION_IS_INVALID
        }
      },
      review_note: {
        optional: true,
        isString: true,
        trim: true
      }
    },
    ['body']
  )
)

