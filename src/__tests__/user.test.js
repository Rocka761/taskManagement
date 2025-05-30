const { beforeAll, describe, it } = require("@jest/globals");
const request = require("supertest");
const app = require("../app");

let token = null;

beforeAll(async () => {
  const res = await request(app).post("/auth/login").send({
    email: "venkatesh@riota.in",
    password:
      "c0c2d707b8d4766268d96313733ee0c007ea6e4271e4666a8c6cea2a9a34f6ea",
  });
  token = res.body?.data?.token;

  console.log(token);
});

describe("User ", () => {
  it("Create User", async () => {
    const res = await request(app).post("/user/create").send({});
  });
});
