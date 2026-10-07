require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../src/app");
const Support = require("../src/models/Support");

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

beforeEach(async () => {
  await Support.deleteMany({});
});

describe("Support API", () => {
  test("GET /api/health works", async () => {
    const res = await request(app).get("/api/health");

    expect(res.status).toBe(200);
    expect(res.body.status).toBe("ok");
  });

  test("GET /api/support returns support count", async () => {
    const res = await request(app).get("/api/support");

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(0);
  });

  test("POST /api/support creates support", async () => {
    const res = await request(app)
      .post("/api/support")
      .send({
        visitorId: "visitor-123",
        name: "Test User",
        departmentYear: "ISE 3rd Year",
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.supported).toBe(true);
    expect(res.body.alreadySupported).toBe(false);
    expect(res.body.count).toBe(1);
  });

  test("POST /api/support does not allow duplicate support", async () => {
    const supportData = {
      visitorId: "visitor-123",
      name: "Test User",
      departmentYear: "ISE 3rd Year",
    };

    await request(app)
      .post("/api/support")
      .send(supportData);

    const res = await request(app)
      .post("/api/support")
      .send(supportData);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.supported).toBe(false);
    expect(res.body.alreadySupported).toBe(true);
    expect(res.body.count).toBe(1);
  });

  test("POST /api/support requires visitorId, name and departmentYear", async () => {
    const res = await request(app)
      .post("/api/support")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test("unknown route returns 404", async () => {
    const res = await request(app).get("/api/unknown");

    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});