import { NextFunction } from "express";
import { Request, Response } from "express";
/*
 * Middleware to set the originalUrl to the value of the x-forwarded-prefix header
 * without this middleware, swagger docs will not work when the app is deployed with serverless framework
 */

const forwardedPrefixSwagger = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  req.originalUrl = (req.headers["x-forwarded-prefix"] || "") + req.url;
  next();
};

export { forwardedPrefixSwagger };
