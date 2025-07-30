import { z } from "zod";
import { loginUserValidatorSchema } from "../users/user.validator";

export type TAuthLogin = z.infer<typeof loginUserValidatorSchema>;