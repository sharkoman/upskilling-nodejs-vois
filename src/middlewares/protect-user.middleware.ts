import { NextFunction, Response } from "express";
import { VALIDATION_MESSAGES, RESPONSE_STATUS } from "@/constants";
import { Blog } from "@/models/blog";
import { IAuthenticatedRequest } from "@/interfaces";

export const protectUserMiddleware = async (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?._id;
  const blog = await Blog.findById(req.params.id);

  if (!blog) {
    return res.status(RESPONSE_STATUS.NOT_FOUND).json({
      message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
    });
  }

  const isBlogOwner = blog.owner.toString() === userId;

  if (!isBlogOwner) {
    return res.status(RESPONSE_STATUS.FORBIDDEN).json({
      message: VALIDATION_MESSAGES.FORBIDDEN_BLOG_ACCESS,
    });
  }

  next();
};