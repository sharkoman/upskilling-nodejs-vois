import { Router } from "express";
import { asyncRoute } from "@/utils";
import { authMiddleware, validateBodyMiddleware } from "@/middlewares";
import { UserController, validateUpdateUser } from "@/models/users";

const router = Router();

router.patch(
  "/:id",
  [authMiddleware, validateBodyMiddleware(validateUpdateUser)],
  asyncRoute(UserController.updateUserName)
);

export default router;
