// server/routes/api.js
const express = require("express");
const router = express.Router();
const {
  searchJobs,
  createJobApplication,
  getAllJobApplications,
  getJobApplicationById,
  updateJobApplication,
  deleteJobApplication,
} = require("../controllers/jobController");

// Existing route for searching jobs
router.post("/search-jobs", searchJobs);

// CRUD routes for job applications
// Create a new job application
router.post("/job-applications", createJobApplication);

// Get all job applications
router.get("/job-applications", getAllJobApplications);

// Get a single job application by ID
router.get("/job-applications/:id", getJobApplicationById);

// Update a job application by ID
router.put("/job-applications/:id", updateJobApplication);

// Delete a job application by ID
router.delete("/job-applications/:id", deleteJobApplication);

module.exports = router;
