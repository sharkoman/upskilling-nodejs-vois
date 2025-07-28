import { z } from "zod";
import { categoryValidatorSchema } from "./category.validator";

export type TCategory = z.infer<typeof categoryValidatorSchema>;