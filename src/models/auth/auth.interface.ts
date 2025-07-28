import { z } from "zod";
import { authValidatorSchema } from "./auth.validator";

export type TAuth = z.infer<typeof authValidatorSchema>;