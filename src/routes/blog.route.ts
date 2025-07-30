import { Router, Request } from "express";
import { asyncRoute } from "@/utils";
import {
  TBlogPayload,
  validateBlog,
  Blog,
  TBlogRequestBody,
} from "@/models/blog";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { IPaginatedResponse, IAuthenticatedRequest } from "@/interfaces";
import { Document } from "mongoose";
import { authMiddleware, blogOwnershipMiddleware } from "@/middlewares";

const router = Router();

router.get(
  "/",
  [authMiddleware],
  asyncRoute(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const blogs = await Blog.find<Document<TBlogPayload>>()
      .populate("category", "name _id")
      .populate("owner", "name email")
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    const data: TBlogPayload[] = blogs.map((blog) => {
      return blog.toObject();
    });

    const total = await Blog.countDocuments({});

    const payload: IPaginatedResponse<TBlogPayload> = {
      data,
      total,
      page: pageNumber,
      limit: limitNumber,
    };

    res.status(RESPONSE_STATUS.SUCCESS).json(payload);
  })
);

router.get(
  "/:id",
  [authMiddleware],
  asyncRoute(async (req, res) => {
    res.send("Blog by id...");
  })
);

router.post(
  "/",
  [authMiddleware],
  asyncRoute(async (req: IAuthenticatedRequest, res) => {
    const { error, success, data } = validateBlog(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isBlogExists = await Blog.findOne({ title: data?.title });

    if (isBlogExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const blogData: TBlogRequestBody = {
      ...data!,
      owner: req.user?._id as string,
    };

    console.log({ blogData });

    const blog = await Blog.create(blogData);

    res.status(RESPONSE_STATUS.CREATED).json(blog);
  })
);

router.put(
  "/:id",
  [authMiddleware, blogOwnershipMiddleware],
  asyncRoute(async (req: IAuthenticatedRequest, res) => {
    const { error, success, data } = validateBlog(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, data!, {
      new: true,
    });

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  })
);

router.delete(
  "/:id",
  [authMiddleware, blogOwnershipMiddleware],
  asyncRoute(async (req: IAuthenticatedRequest, res) => {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    console.log({ blog: blog?.toObject() });

    if (!blog) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(blog.toObject());
  })
);

export default router;
