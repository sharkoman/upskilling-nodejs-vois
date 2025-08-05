import { Request, Response } from "express";
import { TBlogFilter, Blog, TBlogRequestBody } from ".";
import { RootFilterQuery } from "mongoose";
import BlogService from "./blog.service";
import { TBlogPayload } from ".";
import { IAuthenticatedRequest, IPaginatedResponse } from "@/interfaces";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";

class BlogController {
  static async getBlogs(req: Request, res: Response) {
    const {
      page = 1,
      limit = 10,
      categoryId,
      ownerId,
      title,
      content,
      order = "desc",
    } = req.query as TBlogFilter;

    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const filterQuery: RootFilterQuery<TBlogPayload> = {};

    if (categoryId) {
      filterQuery.category = categoryId;
    }

    if (ownerId) {
      filterQuery.owner = ownerId;
    }

    if (title) {
      filterQuery.title = new RegExp(title, "i");
    }

    if (content) {
      filterQuery.content = {
        $regex: new RegExp(content, "i"),
      };
    }

    const blogs = await BlogService.getBlogs(filterQuery)
      .populate("category", "name _id")
      .populate("owner", "name email")
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber)
      .sort({ createdAt: order === "asc" ? 1 : -1 });

    const data: TBlogPayload[] = blogs.map((blog) => {
      return blog.toObject();
    });

    const total = await Blog.countDocuments(filterQuery);

    const payload: IPaginatedResponse<TBlogPayload> = {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
  }

  static async getBlog(req: Request, res: Response) {
    const { id } = req.params;
    const blog = await BlogService.getBlog(id);

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }
    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  }

  static async createBlog(req: IAuthenticatedRequest, res: Response) {
    const data = req.body;

    const isBlogExists = await BlogService.findOne({ title: data?.title });

    if (isBlogExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const blogData: TBlogRequestBody = {
      ...data!,
      owner: req.user?._id as string,
    };

    const blog = await BlogService.createBlog(blogData);

    res.status(RESPONSE_STATUS.CREATED).json(blog.toObject());
  }

  static async updateBlog(req: Request, res: Response) {
    const data = req.body;

    const blog = await BlogService.findByIdAndUpdate(req.params.id, data!);

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  }

  static async deleteBlog(req: Request, res: Response) {
    const blog = await BlogService.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  }
}

export default BlogController;
