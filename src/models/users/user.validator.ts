import { z } from "zod";
import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import { validateRequestBody } from "@/utils/validate-request-body.util";
import { TUser } from "./user.interface";

export const userValidatorSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_NUMBERS.MIN_NAME_LENGTH, {
      message: VALIDATION_MESSAGES.MIN_NAME_LENGTH,
    })
    .max(VALIDATION_NUMBERS.MAX_NAME_LENGTH, {
      message: VALIDATION_MESSAGES.MAX_NAME_LENGTH,
    }),
  email: z.email({
    message: VALIDATION_MESSAGES.INVALID_EMAIL_ADDRESS,
  }),
  password: z.string().min(VALIDATION_NUMBERS.MIN_PASSWORD_LENGTH, {
    message: VALIDATION_MESSAGES.MIN_PASSWORD_LENGTH,
  }),
});

export const validateUser = (user: unknown) => {
  return validateRequestBody<TUser>(userValidatorSchema, user);
};
