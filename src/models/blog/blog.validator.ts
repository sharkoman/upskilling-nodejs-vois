import { z } from "zod";
import mongoose from "mongoose";
import { VALIDATION_MESSAGES, VALIDATION_NUMBERS } from "@/constants";
import { validateRequestBody } from "@/utils";
import { TBlog } from "./blog.interface";

export const blogValidatorSchema = z.object({
  title: z
    .string()
    .min(VALIDATION_NUMBERS.MIN_NAME_LENGTH, {
      message: VALIDATION_MESSAGES.MIN_NAME_LENGTH,
    })
    .max(VALIDATION_NUMBERS.MAX_NAME_LENGTH, {
      message: VALIDATION_MESSAGES.MAX_NAME_LENGTH,
    }),
  content: z.string().min(VALIDATION_NUMBERS.MIN_CATEGORY_NAME_LENGTH, {
    message: VALIDATION_MESSAGES.MIN_CONTENT_LENGTH,
  }),
  category: z
    .string()
    .refine((value) => mongoose.Types.ObjectId.isValid(value), {
      message: VALIDATION_MESSAGES.INVALID_OBJECT_ID,
    }),
});

export const validateBlog = (blog: unknown) => {
  return validateRequestBody<TBlog>(blogValidatorSchema, blog);
};
