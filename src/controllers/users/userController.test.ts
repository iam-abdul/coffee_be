import request from "supertest";
import { test, expect, describe } from "vitest";
import { app } from "../../../app.js";




describe("user auth", () => {
  test("POST /api/v1/users/signup", async () => {
    const response = await request(app).post("/api/v1/users/signup").send({
      email: "s@abdul.com",
      phone_number: "7981345807",
      name: "abdul",
    });
    expect(response.status).toBe(201);
  });
});
