import { Router } from "express";
import { asyncRoute } from "@/utils";
import { authMiddleware, validateBodyMiddleware } from "@/middlewares";
import { CategoryController, validateCategory } from "@/models/categories";

const router = Router();

router
  .get("/", [authMiddleware], asyncRoute(CategoryController.getCategories))
  .post(
    "/",
    [authMiddleware, validateBodyMiddleware(validateCategory)],
    asyncRoute(CategoryController.addCategory)
  )
  .put(
    "/:id",
    [authMiddleware, validateBodyMiddleware(validateCategory)],
    asyncRoute(CategoryController.updateCategory)
  )
  .delete(
    "/:id",
    [authMiddleware],
    asyncRoute(CategoryController.deleteCategory)
  );

export default router;
