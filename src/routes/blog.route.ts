import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Blogs...");
});

router.get("/:id", (req, res) => {
  res.send("Blog by id...");
});

router.post("/", (req, res) => {
  res.send("Create Blog...");
});

router.put("/:id", (req, res) => {
  res.send("Update Blog...");
});

router.delete("/:id", (req, res) => {
  res.send("Delete Blog...");
});

export default router;