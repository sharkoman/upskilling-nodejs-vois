import { VALIDATION_MESSAGES } from "@/constants/validation-messages.const";
import { ExpressErrorHandler } from "@/interfaces/express-handler.interface";

export const errorMiddleware: ExpressErrorHandler = (err, _req, res, _next) => {
  res.status(500).json({
    status: 500,
    message: VALIDATION_MESSAGES.INTERNAL_SERVER_ERROR,
    success: false,
  });
};
