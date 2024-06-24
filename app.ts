import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
import { connectToDBMiddleware } from "./src/middlewares/connectToDB.js";
import userRouter from "./src/router/userRouter.js";
import shopRouter from "./src/router/shopRouter.js";
import swaggerSetup from "./src/utils/swagger/setup.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ExpressMongoSanitize from "express-mongo-sanitize";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(connectToDBMiddleware);
app.use(ExpressMongoSanitize());

swaggerSetup(app);

app.use("/api/v1/users", userRouter);
app.use("/api/v1/shops", shopRouter);

app.all("*", (req, res) => {
  res.status(404).json({ message: "route not found" });
});
export { app };
