import { z } from "zod";
import { userValidatorSchema, updateUserValidatorSchema } from "./user.validator";

export type TUser = z.infer<typeof userValidatorSchema>;
export type TLoginUser = Omit<TUser, "name">;
export type TUpdateUser = z.infer<typeof updateUserValidatorSchema>;
