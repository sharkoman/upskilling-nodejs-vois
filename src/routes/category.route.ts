import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Categories...");
});

router.post("/", (req, res) => {
  res.send("Create Category...");
});

router.put("/:id", (req, res) => {
  res.send("Update Category...");
});

router.delete("/:id", (req, res) => {
  res.send("Delete Category...");
});

export default router;