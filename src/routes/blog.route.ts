import { Router } from "express";
import { asyncRoute } from "@/utils";
import { authMiddleware, blogOwnershipMiddleware } from "@/middlewares";
import BlogController from "@/models/blog/blog.controller";

const router = Router();

router
  .get("/", [authMiddleware], asyncRoute(BlogController.getBlogs))
  .get("/:id", [authMiddleware], asyncRoute(BlogController.getBlog))
  .post("/", [authMiddleware], asyncRoute(BlogController.createBlog))
  .put(
    "/:id",
    [authMiddleware, blogOwnershipMiddleware],
    asyncRoute(BlogController.updateBlog)
  )
  .delete(
    "/:id",
    [authMiddleware, blogOwnershipMiddleware],
    asyncRoute(BlogController.deleteBlog)
  );

export default router;
