import { VALIDATION_NUMBERS } from "./validation-numbers";

export const VALIDATION_MESSAGES = {
  MIN_NAME_LENGTH: `Name must be at least ${VALIDATION_NUMBERS.MIN_NAME_LENGTH} characters long`,
  MAX_NAME_LENGTH: `Name must be less than ${VALIDATION_NUMBERS.MAX_NAME_LENGTH} characters long`,
  MIN_PASSWORD_LENGTH: `Password must be at least ${VALIDATION_NUMBERS.MIN_PASSWORD_LENGTH} characters long`,
  INVALID_EMAIL_ADDRESS: "Invalid Email Address",
  MIN_CATEGORY_NAME_LENGTH: `Category name must be at least ${VALIDATION_NUMBERS.MIN_CATEGORY_NAME_LENGTH} characters long`,
  MAX_CATEGORY_NAME_LENGTH: `Category name must be less than ${VALIDATION_NUMBERS.MAX_CATEGORY_NAME_LENGTH} characters long`,
  MIN_CONTENT_LENGTH: `Content must be at least ${VALIDATION_NUMBERS.MIN_CONTENT_LENGTH} characters long`,
  INVALID_OBJECT_ID: "Invalid ID",
  INTERNAL_SERVER_ERROR: "Internal Server Error",
};
