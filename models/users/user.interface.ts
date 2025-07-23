import { z } from "zod";
import { userValidator } from "./user.validator";

export type TUser = z.infer<typeof userValidator>;
