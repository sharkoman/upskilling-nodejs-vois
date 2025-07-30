import { z } from "zod";
import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import { validateRequestBody } from "@/utils";
import { TCategory } from "./category.interface";

export const categoryValidatorSchema = z.object({
  name: z
    .string()
    .min(VALIDATION_NUMBERS.MIN_NAME_LENGTH, {
      message: VALIDATION_MESSAGES.MIN_NAME_LENGTH,
    })
    .max(VALIDATION_NUMBERS.MAX_NAME_LENGTH, {
      message: VALIDATION_MESSAGES.MAX_NAME_LENGTH,
    }),
});

export const validateCategory = (category: unknown) => {
  return validateRequestBody<TCategory>(categoryValidatorSchema, category);
};