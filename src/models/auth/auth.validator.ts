import { validateRequestBody } from "@/utils";
import { TAuthLogin } from "./auth.interface";
import { loginUserValidatorSchema } from "../users/user.validator";

export const validateAuthLogin = (auth: unknown) => {
  return validateRequestBody<TAuthLogin>(loginUserValidatorSchema, auth);
};
