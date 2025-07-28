import { z } from "zod";
import { blogValidatorSchema } from "./blog.validator";

export type TBlog = z.infer<typeof blogValidatorSchema>;