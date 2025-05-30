const request = require("supertest");
const db = require("../configs/db");
const { describe, it, expect } = require("@jest/globals");
const app = require("../app");

describe("Auth", () => {
  it("Login", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "venkatesh@riota.in",
      password:
        "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6ea",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.data).toHaveProperty("token");
  });

  it("Not Registered User", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "veera@riota.in",
      password:
        "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6ea",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/Not Registered/i);
  });

  it("Wrong Login Password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "venkatesh@riota.in",
      password:
        "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6easdsd",
    });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toMatch(/incorrect/i);
  });

  it("Missing Email", async () => {
    const res = await request(app).post("/auth/login").send({
      password:
        "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6easdsd",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation Failed");
    expect(Array.isArray(res.body.error)).toBe(true);
    expect(res.body.error[0]).toMatch(/email.*required/i);
  });

  it("Missing Password", async () => {
    const res = await request(app).post("/auth/login").send({
      email: "venkatesh@riota.in",
    });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("Validation Failed");
    expect(Array.isArray(res.body.error)).toBe(true);
    expect(res.body.error[0]).toMatch(/password.*required/i);
  });
});
