import { Router } from "express";
import { asyncRoute } from "@/utils";
import {
  authMiddleware,
  blogOwnershipMiddleware,
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
      blogOwnershipMiddleware,
      validateBodyMiddleware(validateBlog),
    ],
    asyncRoute(BlogController.updateBlog)
  )
  .delete(
    "/:id",
    [authMiddleware, blogOwnershipMiddleware],
    asyncRoute(BlogController.deleteBlog)
  );

export default router;
