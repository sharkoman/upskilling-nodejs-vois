import { Router } from "express";
import { asyncRoute } from "@/utils/asyncRoute.util";

const router = Router();

router.get("/", asyncRoute(async (_req, res) => {
  res.send("Blogs...");
}));

router.get("/:id", asyncRoute(async (req, res) => {
  res.send("Blog by id...");
}));

router.post("/", asyncRoute(async (req, res) => {
  res.send("Create Blog...");
}));

router.put("/:id", asyncRoute(async (req, res) => {
  res.send("Update Blog...");
}));

router.delete("/:id", asyncRoute(async (req, res) => {
  res.send("Delete Blog...");
}));

export default router;