import { z } from "zod";
import { blogValidatorSchema } from "./blog.validator";
import { TUser } from "../users";
import { ItemWithID, Payload } from "@/interfaces";
import { TCategory } from "../categories";

export type TBlog = z.infer<typeof blogValidatorSchema>;

export type TBlogRequestBody = TBlog & {
  owner: string;
};

export type TBlogPayload = Payload<{
  title: string;
  content: string;
  category: ItemWithID<TCategory>;
  owner: ItemWithID<Omit<TUser, "password">>;
}>;

export type TBlogFilter = Partial<{
  page: string;
  limit: string;
  order: 'asc' | 'desc';
  categoryId: string;
  ownerId: string;
  title: string;
  content: string;
}>;