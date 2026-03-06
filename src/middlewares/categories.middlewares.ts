import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { CATEGORIES_MESSAGES } from '../constants/messages'

export const createCategoryValidator = validate(
  checkSchema(
    {
      name: {
        notEmpty: { errorMessage: CATEGORIES_MESSAGES.NAME_IS_REQUIRED },
        isString: { errorMessage: CATEGORIES_MESSAGES.NAME_MUST_BE_A_STRING },
        trim: true,
        isLength: { options: { min: 1, max: 50 }, errorMessage: CATEGORIES_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_50 }
      }
    },
    ['body']
  )
)

export const updateCategoryValidator = validate(
  checkSchema(
    {
      name: {
        optional: true,
        isString: { errorMessage: CATEGORIES_MESSAGES.NAME_MUST_BE_A_STRING },
        trim: true,
        isLength: { options: { min: 1, max: 50 }, errorMessage: CATEGORIES_MESSAGES.NAME_LENGTH_MUST_BE_FROM_1_TO_50 }
      }
    },
    ['body']
  )
)

export const categoryIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: CATEGORIES_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: CATEGORIES_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
