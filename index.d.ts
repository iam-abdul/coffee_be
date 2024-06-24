declare module "serverless-http";
import * as express from "express";
import { JwtPayload } from "./src/interfaces/jwtPayloads.ts";

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
      originalUrl: string;
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "dev" | "local";
      DB_CONNECTION_URI: string;
    }
  }
}
