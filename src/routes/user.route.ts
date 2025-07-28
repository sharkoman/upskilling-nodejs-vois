import { Router } from "express";
import { asyncRoute } from "@/utils/asyncRoute.util";

const router = Router();

router.get("/", asyncRoute(async (_req, res) => {
  res.send("Users...");
}));

router.post("/", asyncRoute(async (req, res) => {
  res.send("Create User...");
}));

router.put("/:id", asyncRoute(async (req, res) => {
  res.send("Update User...");
}));

export default router;