import { Router } from "express";
import { asyncRoute } from "@/utils";
import { authMiddleware } from "@/middlewares";
import CategoryController from "@/models/categories/categories.controller";

const router = Router();

router
  .get("/", [authMiddleware], asyncRoute(CategoryController.getCategories))
  .post("/", [authMiddleware], asyncRoute(CategoryController.addCategory))
  .put("/:id", [authMiddleware], asyncRoute(CategoryController.updateCategory))
  .delete("/:id", [authMiddleware], asyncRoute(CategoryController.deleteCategory));

export default router;
