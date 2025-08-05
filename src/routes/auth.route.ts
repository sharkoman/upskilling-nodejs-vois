import { Router } from "express";
import { asyncRoute } from "@/utils";
import { AuthController } from "@/models/auth";

const router = Router();

router.post("/login", asyncRoute(AuthController.login));
router.post("/register", asyncRoute(AuthController.register));

export default router;
