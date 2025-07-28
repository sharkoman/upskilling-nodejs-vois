import { NextFunction, Request, Response } from "express";

export type ExpressHandler<T = void> = (
  req: Request,
  res: Response,
  next?: NextFunction
) => T;

export type ExpressErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
