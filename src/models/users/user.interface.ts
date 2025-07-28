import { z } from "zod";
import { userValidatorSchema } from "./user.validator";

export type TUser = z.infer<typeof userValidatorSchema>;
