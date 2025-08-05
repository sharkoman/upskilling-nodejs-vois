import { Request, Response, NextFunction } from "express";
import { RESPONSE_STATUS } from "@/constants";
import { validateRequestBody } from "@/utils";

export const validateBodyMiddleware = <T = any>(
  validatorFn: (body: unknown) => ReturnType<typeof validateRequestBody<T>>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, success, data } = validatorFn(req.body);

    if (!success) {
      return res.status(RESPONSE_STATUS.BAD_REQUEST).json({
        errors: error,
      });
    }

    req.body = data;

    next();
  };
};
