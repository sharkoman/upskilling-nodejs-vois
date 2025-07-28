import { ExpressHandler } from "../interfaces/express-handler.interface";

export const asyncRoute = <T = unknown>(
  handler: ExpressHandler<Promise<T>>
): ExpressHandler<Promise<T | void>> => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err: unknown) {
      next?.(err);
    }
  };
};
