import express, { Express } from "express";
import swaggerUi from "swagger-ui-express";
import categoryRoute from "../routes/category.route";
import blogRoute from "../routes/blog.route";
import userRoute from "../routes/user.route";
import authRoute from "../routes/auth.route";
import swaggerRoute from "../routes/swagger.route";
import { errorMiddleware } from "@/middlewares";
import { swaggerSpec, swaggerUiOptions } from "../config/swagger.config";

export const initAppRoutes = (app: Express) => {
  app.use(express.json());
  
  // Swagger Documentation
  app.use("/", swaggerRoute);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions));
  
  // API Routes
  app.use("/api/auth", authRoute);
  app.use("/api/categories", categoryRoute);
  app.use("/api/blogs", blogRoute);
  app.use("/api/users", userRoute);

  // Health Check
  /**
   * @swagger
   * /api/health:
   *   get:
   *     summary: Health check endpoint
   *     tags: [System]
   *     security: []
   *     responses:
   *       200:
   *         description: Server is healthy
   *         content:
   *           text/plain:
   *             schema:
   *               type: string
   *               example: "Hello World"
   */
  app.get("/api/health", (_req, res) => {
    res.send("Hello World");
  });
  
  // Error Middleware
  app.use(errorMiddleware);
};