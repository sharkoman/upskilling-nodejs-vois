import { RESPONSE_STATUS } from "@/constants";
import { Request, Response } from "express";
import CategoryService from "./categories.service";
import { validateCategory } from "./category.validator";
import { VALIDATION_MESSAGES } from "@/constants";

class BlogController {
  static getCategories = async (_req: Request, res: Response) => {
    const categories = await CategoryService.findAll();
    res.status(RESPONSE_STATUS.SUCCESS).json(categories);
  };

  static addCategory = async (req: Request, res: Response) => {
    const { error, success, data } = validateCategory(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const isCategoryExists = await CategoryService.findOne({
      name: data?.name!,
    });

    if (isCategoryExists) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        message: VALIDATION_MESSAGES.ITEM_ALREADY_EXISTS,
      });
    }

    const category = await CategoryService.create(data!);

    res.status(RESPONSE_STATUS.CREATED).json(category);
  };

  static updateCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { error, success, data } = validateCategory(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    const category = await CategoryService.update(id, data!);
    res.status(RESPONSE_STATUS.SUCCESS).json(category);
  };

  static deleteCategory = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await CategoryService.delete(id);
    res.status(RESPONSE_STATUS.SUCCESS).json(category);
  };
}

export default BlogController;
