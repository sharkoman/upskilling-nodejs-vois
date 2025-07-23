import { z } from "zod";
import { categoryValidator } from "./category.validator";

export type TCategory = z.infer<typeof categoryValidator>;