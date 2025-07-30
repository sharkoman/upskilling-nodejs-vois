import { Router } from "express";
import { asyncRoute } from "@/utils";
import { TBlogPayload, validateBlog, Blog } from "@/models/blog";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { IPaginatedResponse } from "@/interfaces";
import { Document } from "mongoose";

const router = Router();

router.get(
  "/",
  asyncRoute(async (req, res) => {
    // Get all blogs paginated with same structure as IPaginatedResponse,
    // the route should be /blogs?page=1&limit=10 with default page and limit of 10
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
  asyncRoute(async (req, res) => {
    res.send("Blog by id...");
  })
);

router.post(
  "/",
  asyncRoute(async (req, res) => {
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

    const blog = await Blog.create(data);

    res.status(RESPONSE_STATUS.CREATED).json(blog);
  })
);

router.put(
  "/:id",
  asyncRoute(async (req, res) => {
    res.send("Update Blog...");
  })
);

router.delete(
  "/:id",
  asyncRoute(async (req, res) => {
    res.send("Delete Blog...");
  })
);

export default router;
