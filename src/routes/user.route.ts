import { Router } from "express";
import { asyncRoute } from "@/utils";
import UserController from "@/models/users/users.controller";
import { authMiddleware } from "@/middlewares";

const router = Router();

router.patch(
  "/:id",
  [authMiddleware],
  asyncRoute(UserController.updateUserName)
);

export default router;
