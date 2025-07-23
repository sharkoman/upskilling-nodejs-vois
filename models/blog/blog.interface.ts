import { z } from "zod";
import { blogValidator } from "./blog.validator";

export type TBlog = z.infer<typeof blogValidator>;