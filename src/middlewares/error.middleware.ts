import { ExpressErrorHandler } from "../shared/interfaces/express-handler.interface";

export const errorMiddleware: ExpressErrorHandler = (err, req, res, next) => {
  res.status(500).json({
    status: 500,
    message: "Internal Server Error",
    success: false,
  });
};
