import { Router } from "express";
import { asyncRoute } from "@/utils/async-route.util";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import { validateCategory, Category } from "@/models/categories";

const router = Router();

router.get("/", asyncRoute(async (_req, res) => {
  res.send("Categories...");
}));

router.post("/", asyncRoute(async (req, res) => {
    const { error, success, data } = validateCategory(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isCategoryExists = await Category.findOne({ name: data?.name });

    if (isCategoryExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const category = await Category.create(data);

    res.status(RESPONSE_STATUS.CREATED).json(category);
}));

router.put("/:id", asyncRoute(async (req, res) => {
  res.send("Update Category...");
}));

router.delete("/:id", asyncRoute(async (req, res) => {
  res.send("Delete Category...");
}));

export default router;