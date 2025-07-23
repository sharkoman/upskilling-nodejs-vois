import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Users...");
});

router.post("/", (req, res) => {
  res.send("Create User...");
});

router.put("/:id", (req, res) => {
  res.send("Update User...");
});

export default router;