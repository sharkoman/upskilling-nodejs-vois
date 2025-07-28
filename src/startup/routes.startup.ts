import express, { Express } from "express";
import categoryRoute from "../routes/category.route";
import blogRoute from "../routes/blog.route";
import userRoute from "../routes/user.route";
import { errorMiddleware } from "@/middlewares/error.middleware";

export const initAppRoutes = (app: Express) => {
  app.use(express.json());
  
  app.use("/api/categories", categoryRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/users", userRoute);

  // Health Check
  app.get("/api/health", (_req, res) => {
    res.send("Hello World");
  });
  
  // Error Middleware
  app.use(errorMiddleware);
};
