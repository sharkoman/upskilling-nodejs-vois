import { z } from "zod";
import { loginUserValidatorSchema } from "../users/user.validator";
import { TUser } from "../users/user.interface";
import { Types } from "mongoose";

export type TAuthLogin = z.infer<typeof loginUserValidatorSchema>;

export type IAuthLoginResponse = {
  token: string;
  user: { id: Types.ObjectId } & Omit<TUser, "password">;
};
