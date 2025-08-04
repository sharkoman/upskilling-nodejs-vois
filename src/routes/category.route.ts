import { Router } from "express";
import { asyncRoute } from "@/utils";
import { RESPONSE_STATUS, VALIDATION_MESSAGES } from "@/constants";
import {
  validateCategory,
  Category,
  TCategoryPayload,
} from "@/models/categories";
import { Document } from "mongoose";
import { authMiddleware } from "@/middlewares";

const router = Router();


router.get(
  "/",
  [authMiddleware],
  asyncRoute(async (_req, res) => {
    const categories = await Category.find<Document<TCategoryPayload>>();

    const data: TCategoryPayload[] = categories.map((category) => {
      return category.toObject();
    });

    res.send(data);
  })
);


router.post(
  "/",
  [authMiddleware],
  asyncRoute(async (req, res) => {
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
  })
);


router.put(
  "/:id",
  asyncRoute(async (req, res) => {
    const { id } = req.params;
    const { error, success, data } = validateCategory(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const category = await Category.findByIdAndUpdate(
      id,
      { name: data!.name },
      { new: true }
    );

    if (!category) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(category);
  })
);


router.delete(
  "/:id",
  asyncRoute(async (req, res) => {
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(RESPONSE_STATUS.NOT_FOUND).json({
        message: VALIDATION_MESSAGES.ITEM_NOT_FOUND,
      });
    }

    res.status(RESPONSE_STATUS.SUCCESS).json(category);
  })
);

export default router;
