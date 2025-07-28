import express, { Express } from "express";
import categoryRoute from "../routes/category.route";
import blogRoute from "../routes/blog.route";

export const initAppRoutes = (app: Express) => {
  app.use(express.json());
  app.use("/api/categories", categoryRoute);
  app.use("/api/blogs", blogRoute);
  app.get("/", (_req, res) => {
    res.send("Hello World");
  });
};
