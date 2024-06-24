// vitest.config.ts
import { loadEnv } from "vite";
import { defineConfig } from "vitest/config";
import fs from "fs";
import * as dotenv from "dotenv";

function parseEnvFiles(configFile: string) {
  try {
    const data = fs.readFileSync(configFile, "utf-8");
    const data_env = fs.readFileSync(process.cwd() + "/" + ".env", "utf-8");
    const json_env = dotenv.parse(data_env);
    console.log("the json env is ", json_env);
    let json = JSON.parse(data);
    json = { ...json, ...dotenv.parse(data), ...json_env };

    return json;
  } catch (error) {
    console.error(`Error reading or parsing file: ${configFile}`, error);
    return null;
  }
}

let env = parseEnvFiles(process.cwd() + "/" + process.env.CONFIG_FILE);

// console.log("the env is", env);

export default defineConfig({
  test: {
    env: env,
    coverage: {
      reporter: ["text", "json", "html"],
    },
  },
});
