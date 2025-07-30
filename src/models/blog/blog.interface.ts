import { z } from "zod";
import { blogValidatorSchema } from "./blog.validator";

export type TBlog = z.infer<typeof blogValidatorSchema>;

export type TBlogPayload = {
  id: string;
  title: string;
  content: string;
  category: string;
  owner: {
    id: string;
    name: string;
    email: string;
  };
};