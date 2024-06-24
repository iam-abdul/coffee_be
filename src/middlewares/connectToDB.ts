import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const connectToDBMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (mongoose.connection.readyState === 1) {
    console.log("Already connected to MongoDB");
    next();
  } else {
    try {
      await mongoose.connect(process.env.DB_CONNECTION_URI as string, {});

      console.log("Connected to MongoDB");
      next();
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      res.status(500).send("Error connecting to MongoDB");
    }
  }
};
