import { test, expect, beforeAll } from "bun:test";
import request from "supertest";
import app from "../src/app.js";
import connectDB from "../src/db/index.js";

let dbConnected = false;

beforeAll(async () => {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
});

test("POST /api/users/register (public)", async () => {
  const res = await request(app)
    .post("/api/users/register")
    .send({
      email: `testuser${Date.now()}@example.com`,
      username: `testuser${Date.now()}`,
      fullName: `Test User ${Date.now()}`,
      password: "TestPassword123",
    });
  expect(res.status).toBe(201);
});
