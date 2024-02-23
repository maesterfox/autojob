// server/__tests__/jobApplication.test.js
const mongoose = require("mongoose");
const JobApplication = require("../models/jobApplication");
const dbHandler = require("./dbHandler"); // You'll need to create a utility file for handling in-memory DB operations

beforeAll(async () => await dbHandler.connect());
afterEach(async () => await dbHandler.clearDatabase());
afterAll(async () => await dbHandler.closeDatabase());

describe("Job Application Model Test", () => {
  it("create & save job application successfully", async () => {
    const jobData = {
      jobTitle: "Software Engineer",
      jobSite: "Indeed",
      location: "New York",
    };
    const validJob = new JobApplication(jobData);
    const savedJob = await validJob.save();

    // Assertions
    expect(savedJob._id).toBeDefined();
    expect(savedJob.jobTitle).toBe(jobData.jobTitle);
  });
});
