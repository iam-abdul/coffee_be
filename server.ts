import { app } from "./app.js";
import serverless from "serverless-http";

const run = serverless(app);

export { run };
