/// <reference types="mocha" />
import "dotenv/config";

import request from "supertest";
import { expect } from "chai";
import app from "../src/app.js";
import connectDB from "../src/db/index.js";

let dbConnected = false;

before(async function () {
  this.timeout(10000); // 10 seconds
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
});

describe("POST /api/users/register (public)", () => {
  it("should register a new user and return 201", async function () {
    const res = await request(app)
      .post("/api/users/register")
      .send({
        email: `testuser${Date.now()}@example.com`,
        username: `testuser${Date.now()}`,
        fullName: `Test User ${Date.now()}`,
        password: "TestPassword123",
      });
    expect(res.status).to.equal(201);
  });
});
