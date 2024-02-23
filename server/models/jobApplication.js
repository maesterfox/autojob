const mongoose = require("mongoose");

// Define MongoDB schema for job applications
const jobApplicationSchema = new mongoose.Schema({
  jobTitle: String,
  jobSite: String,
  location: String,
  radius: Number,
  coverLetter: String,
  // Add more fields as needed
});

// Create and export the model
const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
module.exports = JobApplication;
