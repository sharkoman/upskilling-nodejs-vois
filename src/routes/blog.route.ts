import { Router } from "express";
import { asyncRoute } from "@/utils/async-route.util";
import { validateBlog } from "@/models/blog";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import Blog from "@/models/blog/blog.model";

const router = Router();

router.get("/", asyncRoute(async (_req, res) => {
  res.send("Blogs...");
}));

router.get("/:id", asyncRoute(async (req, res) => {
  res.send("Blog by id...");
}));

router.post("/", asyncRoute(async (req, res) => {
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
}));

router.put("/:id", asyncRoute(async (req, res) => {
  res.send("Update Blog...");
}));

router.delete("/:id", asyncRoute(async (req, res) => {
  res.send("Delete Blog...");
}));

export default router;