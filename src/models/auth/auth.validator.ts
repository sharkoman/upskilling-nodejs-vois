import { z } from "zod";
import { validateRequestBody } from "@/shared/utils";
import { TAuth } from "./auth.interface";
import { VALIDATION_NUMBERS } from "@/constants";

export const authValidatorSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const validateAuth = (auth: unknown) => {
  return validateRequestBody<TAuth>(authValidatorSchema, auth);
};
