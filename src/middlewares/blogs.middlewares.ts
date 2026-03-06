import { checkSchema } from 'express-validator'
import { validate } from '../utils/validation'
import { BLOGS_MESSAGES } from '../constants/messages'

export const createBlogValidator = validate(
  checkSchema(
    {
      user_id: { notEmpty: { errorMessage: BLOGS_MESSAGES.INVALID_USER_ID }, isMongoId: { errorMessage: BLOGS_MESSAGES.INVALID_USER_ID } },
      content: { notEmpty: { errorMessage: BLOGS_MESSAGES.CONTENT_IS_REQUIRED } },
      blogImgUrl: { optional: true }
    },
    ['body']
  )
)

export const updateBlogValidator = validate(
  checkSchema(
    {
      content: { optional: true },
      blogImgUrl: { optional: true }
    },
    ['body']
  )
)

export const blogIdValidator = validate(
  checkSchema(
    {
      id: {
        notEmpty: { errorMessage: BLOGS_MESSAGES.INVALID_ID },
        isMongoId: { errorMessage: BLOGS_MESSAGES.INVALID_ID }
      }
    },
    ['params']
  )
)
