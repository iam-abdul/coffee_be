import { Express } from "express";
import { forwardedPrefixSwagger } from "./originalUrlMiddleware.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi, {SwaggerOptions} from "swagger-ui-express";

export default function setupSwagger(app: Express) {
  if (process.env.NODE_ENV === "dev" || process.env.NODE_ENV === "local") {
    const swaggerOptions:SwaggerOptions = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "Backend API",
          version: "1.0.0",
          description: "A simple backend application",
        },
        basePath:"/api-docs/" 
      },
      apis: [" src/controllers/*/*.ts", "src/controllers/*.ts"],
    };

    const specs = swaggerJsdoc(swaggerOptions);


    app.use(
      "/api-docs",
      forwardedPrefixSwagger,
      swaggerUi.serve,
      swaggerUi.setup(specs)
    );
  }
}
