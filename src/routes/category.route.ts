import { Router } from "express";
import { asyncRoute } from "@/utils/asyncRoute.util";

const router = Router();

router.get("/", asyncRoute(async (_req, res) => {
  res.send("Categories...");
}));

router.post("/", asyncRoute(async (req, res) => {
  res.send("Create Category...");
}));

router.put("/:id", asyncRoute(async (req, res) => {
  res.send("Update Category...");
}));

router.delete("/:id", asyncRoute(async (req, res) => {
  res.send("Delete Category...");
}));

export default router;