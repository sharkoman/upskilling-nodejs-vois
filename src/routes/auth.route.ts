import { Router } from "express";
import { asyncRoute } from "@/utils";
import { AuthController, validateAuthLogin } from "@/models/auth";
import { validateBodyMiddleware } from "@/middlewares";
import { validateUser } from "@/models/users";

const router = Router();

router
  .post(
    "/login",
    validateBodyMiddleware(validateAuthLogin),
    asyncRoute(AuthController.login)
  )
  .post(
    "/register",
    validateBodyMiddleware(validateUser),
    asyncRoute(AuthController.register)
  );

export default router;
