import jwt from "jsonwebtoken";
import { VALIDATION_MESSAGES, RESPONSE_STATUS } from "@/constants";
import { NextFunction, Response } from "express";
import { IAuthenticatedRequest } from "@/interfaces";

export const authMiddleware = (
  req: IAuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(RESPONSE_STATUS.UNAUTHORIZED)
      .json({ message: VALIDATION_MESSAGES.UNAUTHORIZED });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded as { _id: string };
    next();
  } catch (error) {
    res
      .status(RESPONSE_STATUS.UNAUTHORIZED)
      .json({ message: VALIDATION_MESSAGES.UNAUTHORIZED });
    return;
  }
};
