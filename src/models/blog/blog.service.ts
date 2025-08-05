import { Document } from "mongoose";
import { Blog, TBlogPayload } from ".";
import { TBlog, TBlogFilter } from ".";

class BlogService {
  static getBlogs(filter: TBlogFilter) {
    return Blog.find<Document<TBlogPayload>>(filter);
  }

  static getBlog(id: string) {
    return Blog.findById<Document<TBlogPayload>>(id);
  }

  static async createBlog(blog: TBlog) {
    return await Blog.create(blog);
  }

  static async findOne(filter: Partial<TBlogFilter>) {
    return await Blog.findOne<Document<TBlogPayload>>(filter);
  }

  static async findByIdAndUpdate(id: string, data: Partial<TBlog>) {
    return await Blog.findByIdAndUpdate<Document<TBlogPayload>>(id, data, {
      new: true,
    });
  }

  static async findByIdAndDelete(id: string) {
    return await Blog.findByIdAndDelete<Document<TBlogPayload>>(id);
  }
}

export default BlogService;
