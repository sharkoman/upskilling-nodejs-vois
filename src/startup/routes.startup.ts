import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import categoryRoute from "../routes/category.route";
import blogRoute from "../routes/blog.route";
import userRoute from "../routes/user.route";
import authRoute from "../routes/auth.route";
import { errorMiddleware } from "@/middlewares";
import { swaggerSpec, swaggerUiOptions } from "../config/swagger.config";

export const initAppRoutes = (app: Express) => {
  app.use(express.json());
  
  // Swagger Documentation
  app.get('/api-docs.json', (_req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
  
  // API Routes
  app.use("/api/auth", authRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/users", userRoute);

  // Error Middleware
  app.use(errorMiddleware);
};
