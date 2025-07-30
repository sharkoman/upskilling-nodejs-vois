import { VALIDATION_NUMBERS } from "./validation-numbers.const";

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
  ITEM_ALREADY_EXISTS: "Item already exists",
  USER_ALREADY_EXISTS: "User already exists, please login",
  ITEM_NOT_FOUND: "Item not found",
  INVALID_PASSWORD: "Invalid password, must be at least 8 characters long and contain letters and numbers",
  USER_OR_PASSWORD_INVALID: "User or password invalid",
} as const;
