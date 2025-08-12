import { Router } from "express";
import { asyncRoute } from "@/utils";
import {
  authMiddleware,
  protectUserMiddleware,
  validateBodyMiddleware,
} from "@/middlewares";
import { BlogController, validateBlog } from "@/models/blog";

const router = Router();

router
  .get("/", [authMiddleware], asyncRoute(BlogController.getBlogs))
  .get("/:id", [authMiddleware], asyncRoute(BlogController.getBlog))
  .post(
    "/",
    [authMiddleware, validateBodyMiddleware(validateBlog)],
    asyncRoute(BlogController.createBlog)
  )
  .put(
    "/:id",
    [
      authMiddleware,
      protectUserMiddleware,
      validateBodyMiddleware(validateBlog),
    ],
    asyncRoute(BlogController.updateBlog)
  )
  .delete(
    "/:id",
    [authMiddleware, protectUserMiddleware],
    asyncRoute(BlogController.deleteBlog)
  );

export default router;
