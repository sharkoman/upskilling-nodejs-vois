import { z } from "zod";
import { userValidatorSchema, updateUserValidatorSchema } from "./user.validator";
import { Payload } from "@/interfaces";
import { Document } from "mongoose";

export type TUser = z.infer<typeof userValidatorSchema>;
export type TLoginUser = Omit<TUser, "name">;
export type TUpdateUser = z.infer<typeof updateUserValidatorSchema>;
export type TUserPayload = Payload<Omit<TUser, "password">>;
export interface IUserDocument extends TUser {
  generateAuthToken(): string;
}