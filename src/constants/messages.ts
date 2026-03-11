export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NAME_IS_REQUIRED: 'Name is required',
  NAME_MUST_BE_A_STRING: 'Name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name length must be from 1 to 100',
  EMAIL_ALREADY_EXISTS: 'Email already exists',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  ROLE_NOT_FOUND: 'Role not found.',
  ROLE_CREATED: 'Role created successfully.',
  ROLE_UPDATED: 'Role updated successfully.',
  ROLE_DELETED: 'Role deleted successfully.',
  ROLE_EXISTS: 'Role already exists.',
  ROLE_REQUIRED: 'Role is required.',
  ROLE_INVALID: 'Role is invalid.',
  PASSWORD_IS_WRONG: 'Password is wrong',
  PASSWORD_IS_REQUIRED: 'Password is required',
  PASSWORD_MUST_BE_A_STRING: 'Password must be a string',
  PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Password length must be from 8 to 50',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required',
  CONFIRM_PASSWORD_MUST_BE_A_STRING: 'Confirm password must be a string',
  CONFIRM_PASSWORD_LENGTH_MUST_BE_FROM_8_TO_50: 'Confirm length must be from 8 to 50',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol',
  CONFIRM_PASSWORD_MUST_BE_THE_SAME_AS_PASSWORD: 'Confirm password must be the same as password',
  DATE_OF_BIRTH_BE_ISO8601: 'Date of birth must be ISO8601',
  EMAIL_OR_PASSWORD_IS_INCORRECT: 'Email or password is incorrect',
  LOGIN_SUCCESS: 'Login successfully',
  REGISTER_SUCCESS: 'Register successfully',
  ACCESS_TOKEN_IS_REQUIRED: 'Access Token is required',
  REFRESH_TOKEN_IS_REQUIRED: 'Refresh Token is required',
  LOGOUT_SUCCESS: 'Logout successfully',
  REFRESH_TOKEN_IS_INVALID: 'Refresh Token is invalid',
  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verify token is required',
  EMAIL_VERIFY_TOKEN_IS_INVALID: 'Email verify token is invalid',
  EMAIL_VERIFY_SUCCESS: 'Email verify successfully',
  USER_NOT_FOUND: 'User not found',
  EMAIL_HAS_BEEN_VERIFY: 'Email has been verify',
  ACCOUNT_HAS_BEEN_BANNED: 'Account has been banned',
  RESEND_EMAIL_SUCCESS: 'Resend email successfully',
  CHECK_EMAIL_TO_RESET_PASSWORD: 'Check email to reset password',
  GET_PROFILE_SUCCESS: 'Get Profile success',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'forgot password is required',
  FORGOT_PASSWORD_TOKEN_IS_INVALID: 'forgot password is invalid',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'verify forgot password token success',
  RESET_PASSWORD_SUCCESS: 'reset password success',
  GET_ME_SUCCESS: 'get me success',
  IMAGE_URL_MUST_BE_A_STRING: 'Image url must be a string',
  IMAGE_URL_LENGTH_MUST_BE_LESS_THAN_400: 'Image url length must be less than 400',
  BIO_MUST_BE_A_STRING: 'Bio must be a string',
  BIO_LENGTH_MUST_BE_LESS_THAN_200: 'Bio length must be less than 200',
  LOCATION_MUST_BE_A_STRING: 'Location must be a string',
  LOCATION_LENGTH_MUST_BE_LESS_THAN_200: 'Location length must be less than 200',
  WEBSITE_MUST_BE_A_STRING: 'Website must be a string',
  WEBSITE_LENGTH_MUST_BE_LESS_THAN_200: 'Website length must be less than 200',
  USERNAME_MUST_BE_A_STRING: 'Username must be a string',
  USERNAME_LENGTH_MUST_BE_LESS_THAN_50: 'Username length must be less than 50',
  UPDATE_PROFILE_SUCCESS: 'Update profile success',
  USER_NOT_VERIFIED: 'User not verified',
  USERNAME_ALREADY_EXISTS: 'Username already exists',
  USERNAME_IS_INVALID:
    'Username must be a string and length must be 4 - 15, and contain only letters, numbers, and underscores, not only numbers',
  CHANGE_PASSWORD_SUCCESS: 'Change password success',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successfully',
  INVALID_USER_ID: 'Invalid user id'
} as const

export const CATEGORIES_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Category not found',
  CREATED: 'Category created successfully',
  UPDATED: 'Category updated successfully',
  DELETED: 'Category deleted successfully',
  NAME_IS_REQUIRED: 'Category name is required',
  NAME_MUST_BE_A_STRING: 'Category name must be a string',
  NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Category name length must be from 1 to 50',
  INVALID_ID: 'Invalid category id'
} as const

export const COURSES_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Course not found',
  CREATED: 'Course created successfully',
  UPDATED: 'Course updated successfully',
  DELETED: 'Course deleted successfully',
  NAME_IS_REQUIRED: 'Course name is required',
  NAME_MUST_BE_A_STRING: 'Course name must be a string',
  SLUG_IS_REQUIRED: 'Slug is required',
  PRICE_MUST_BE_A_NUMBER: 'Price must be a number',
  PRICE_MUST_BE_POSITIVE: 'Price must be positive',
  INVALID_ID: 'Invalid course id',
  INVALID_USER_ID: 'Invalid user id',
  INVALID_CATEGORY_ID: 'Invalid category id'
} as const

export const LESSONS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Lesson not found',
  CREATED: 'Lesson created successfully',
  UPDATED: 'Lesson updated successfully',
  DELETED: 'Lesson deleted successfully',
  NAME_IS_REQUIRED: 'Lesson name is required',
  INVALID_ID: 'Invalid lesson id',
  INVALID_SESSION_ID: 'Invalid session id',
  INVALID_COURSE_ID: 'Invalid course id'
} as const

export const SESSIONS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Session not found',
  CREATED: 'Session created successfully',
  UPDATED: 'Session updated successfully',
  DELETED: 'Session deleted successfully',
  NAME_IS_REQUIRED: 'Session name is required',
  INVALID_ID: 'Invalid session id',
  INVALID_COURSE_ID: 'Invalid course id',
  INVALID_USER_ID: 'Invalid user id'
} as const

export const REVIEWS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Review not found',
  CREATED: 'Review created successfully',
  UPDATED: 'Review updated successfully',
  DELETED: 'Review deleted successfully',
  RATING_IS_REQUIRED: 'Rating is required',
  RATING_MUST_BE_A_NUMBER: 'Rating must be a number',
  RATING_MUST_BE_FROM_1_TO_5: 'Rating must be from 1 to 5',
  INVALID_ID: 'Invalid review id',
  INVALID_COURSE_ID: 'Invalid course id',
  INVALID_USER_ID: 'Invalid user id',
  INVALID_APPOINTMENT_ID: 'Invalid appointment id'
} as const

export const CARTS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Cart not found',
  ADDED: 'Added to cart successfully',
  UPDATED: 'Cart updated successfully',
  REMOVED: 'Removed from cart successfully',
  INVALID_ID: 'Invalid cart id',
  INVALID_COURSE_ID: 'Invalid course id',
  INVALID_USER_ID: 'Invalid user id',
  CART_EMPTY: 'Cart is empty'
} as const

export const ORDERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Order not found',
  CREATED: 'Order created successfully',
  UPDATED: 'Order status updated successfully',
  TOTAL_AMOUNT_IS_REQUIRED: 'Total amount is required',
  TOTAL_AMOUNT_MUST_BE_POSITIVE: 'Total amount must be positive',
  INVALID_ID: 'Invalid order id',
  INVALID_CART_ID: 'Invalid cart id'
} as const

export const ORDER_LOGS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Order log not found',
  CREATED: 'Order log created successfully',
  INVALID_ID: 'Invalid order log id',
  INVALID_ORDER_ID: 'Invalid order id',
  INVALID_COURSE_ID: 'Invalid course id',
  INVALID_USER_ID: 'Invalid user id',
  INVALID_CART_ID: 'Invalid cart id'
} as const

export const ORDER_DETAILS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Order detail not found',
  CREATED: 'Order detail created successfully',
  UPDATED: 'Order detail updated successfully',
  DELETED: 'Order detail deleted successfully',
  AMOUNT_MUST_BE_A_NUMBER: 'Amount must be a number',
  AMOUNT_MUST_BE_POSITIVE: 'Amount must be positive',
  INVALID_ID: 'Invalid order detail id',
  INVALID_ORDER_ID: 'Invalid order id',
  INVALID_TRANSACTION_ID: 'Invalid transaction id'
} as const

export const CONSULTANTS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Consultant not found',
  CREATED: 'Consultant created successfully',
  UPDATED: 'Consultant updated successfully',
  DELETED: 'Consultant deleted successfully',
  FULL_NAME_IS_REQUIRED: 'Full name is required',
  EMAIL_IS_REQUIRED: 'Email is required',
  EMAIL_IS_INVALID: 'Email is invalid',
  INVALID_ID: 'Invalid consultant id',
  INVALID_USER_ID: 'Invalid user id'
} as const

export const APPOINTMENTS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Appointment not found',
  CREATED: 'Appointment created successfully',
  UPDATED: 'Appointment updated successfully',
  CANCELLED: 'Appointment cancelled successfully',
  SCHEDULED_AT_IS_REQUIRED: 'Scheduled date is required',
  SCHEDULED_AT_MUST_BE_FUTURE: 'Scheduled date must be in the future',
  INVALID_ID: 'Invalid appointment id',
  INVALID_USER_ID: 'Invalid user id',
  INVALID_CONSULTANT_ID: 'Invalid consultant id'
} as const

export const SURVEYS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Survey not found',
  CREATED: 'Survey created successfully',
  UPDATED: 'Survey updated successfully',
  DELETED: 'Survey deleted successfully',
  NAME_IS_REQUIRED: 'Survey name is required',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Survey name length must be from 1 to 100',
  INVALID_ID: 'Invalid survey id'
} as const

export const QUESTIONS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Question not found',
  CREATED: 'Question created successfully',
  UPDATED: 'Question updated successfully',
  DELETED: 'Question deleted successfully',
  QUESTION_CONTENT_IS_REQUIRED: 'Question content is required',
  INVALID_ID: 'Invalid question id',
  INVALID_SURVEY_ID: 'Invalid survey id'
} as const

export const ANSWER_OPTIONS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Answer option not found',
  CREATED: 'Answer option created successfully',
  UPDATED: 'Answer option updated successfully',
  DELETED: 'Answer option deleted successfully',
  OPTION_CONTENT_IS_REQUIRED: 'Option content is required',
  SCORE_MUST_BE_A_NUMBER: 'Score must be a number',
  POSITION_ORDER_MUST_BE_A_NUMBER: 'Position order must be a number',
  INVALID_ID: 'Invalid answer option id',
  INVALID_QUESTION_ID: 'Invalid question id'
} as const

export const SURVEY_RESULTS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Survey result not found',
  CREATED: 'Survey result created successfully',
  TOTAL_SCORE_MUST_BE_A_NUMBER: 'Total score must be a number',
  INVALID_ID: 'Invalid survey result id',
  INVALID_USER_ID: 'Invalid user id',
  INVALID_SURVEY_ID: 'Invalid survey id',
  INVALID_PROGRAM_ID: 'Invalid program id'
} as const

export const USER_ANSWER_LOGS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'User answer log not found',
  CREATED: 'User answer log created successfully',
  SCORE_MUST_BE_A_NUMBER: 'Score must be a number',
  INVALID_ID: 'Invalid user answer log id',
  INVALID_SURVEY_RESULT_ID: 'Invalid survey result id',
  INVALID_QUESTION_ID: 'Invalid question id',
  INVALID_ANSWER_OPTION_ID: 'Invalid answer option id',
  INVALID_PROGRAM_ID: 'Invalid program id'
} as const

export const TRANSACTIONS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Transaction not found',
  CREATED: 'Transaction created successfully',
  UPDATED: 'Transaction updated successfully',
  AMOUNT_MUST_BE_A_NUMBER: 'Amount must be a number',
  AMOUNT_MUST_BE_POSITIVE: 'Amount must be positive',
  INVALID_ID: 'Invalid transaction id',
  INVALID_CONSULTANT_ID: 'Invalid consultant id',
  INVALID_PAYMENT_ID: 'Invalid payment id',
  INVALID_COURSE_ID: 'Invalid course id',
  INVALID_PROGRAM_ID: 'Invalid program id'
} as const

export const PAYMENTS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Payment not found',
  CREATED: 'Payment created successfully',
  UPDATED: 'Payment status updated successfully',
  PAYMENT_NO_IS_REQUIRED: 'Payment number is required',
  AMOUNT_MUST_BE_A_NUMBER: 'Amount must be a number',
  AMOUNT_MUST_BE_POSITIVE: 'Amount must be positive',
  INVALID_ID: 'Invalid payment id',
  INVALID_USER_ID: 'Invalid user id'
} as const

export const PROGRAMS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Program not found',
  CREATED: 'Program created successfully',
  UPDATED: 'Program updated successfully',
  DELETED: 'Program deleted successfully',
  NAME_IS_REQUIRED: 'Program name is required',
  NAME_LENGTH_MUST_BE_FROM_1_TO_50: 'Program name length must be from 1 to 50',
  START_DATE_IS_REQUIRED: 'Start date is required',
  END_DATE_IS_REQUIRED: 'End date is required',
  END_DATE_MUST_BE_AFTER_START: 'End date must be after start date',
  INVALID_ID: 'Invalid program id'
} as const

export const BLOGS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',
  NOT_FOUND: 'Blog not found',
  CREATED: 'Blog created successfully',
  UPDATED: 'Blog updated successfully',
  DELETED: 'Blog deleted successfully',
  CONTENT_IS_REQUIRED: 'Content is required',
  INVALID_ID: 'Invalid blog id',
  INVALID_USER_ID: 'Invalid user id'
} as const
