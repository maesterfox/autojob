// server/__tests__/jobRoutes.test.js
const request = require("supertest");
const app = require("../app"); // Make sure your Express app is exported from app.js for this to work

describe("Job Application Routes Test", () => {
  it("GET /api/job-applications - success", async () => {
    const result = await request(app).get("/api/job-applications");
    expect(result.statusCode).toEqual(200);
    expect(Array.isArray(result.body)).toBeTruthy();
  });
});
