// server/controllers/jobController.js
const puppeteer = require("puppeteer");
const JobApplication = require("../models/jobApplication"); // Ensure the path matches your project structure

exports.searchJobs = async (req, res) => {
  const {
    jobSiteURL,
    jobTitles,
    locations,
    radius,
    coverLetter,
    username,
    password,
  } = req.body;

  let allJobs = []; // Array to accumulate all jobs

  const browser = await puppeteer.launch({ headless: true }); // Consider running headless for performance
  const page = await browser.newPage();

  // Login if credentials are provided
  if (username && password) {
    await page.goto(`${jobSiteURL}/login`); // Adjust based on the actual login URL

    // Fill in the login form; adjust selectors as necessary
    await page.type("#usernameSelector", username); // Replace '#usernameSelector' with the actual selector
    await page.type("#passwordSelector", password); // Replace '#passwordSelector' with the actual selector
    await page.click("#loginButtonSelector"); // Replace '#loginButtonSelector' with the actual selector
    await page.waitForNavigation(); // Wait for the page to load after login
  }

  // Loop through each job title and location combination
  for (let jobTitle of jobTitles) {
    for (let location of locations) {
      // Navigate to the job search page with the current job title and location
      const searchURL = `${jobSiteURL}/jobs/${jobTitle}/in-${location}${
        radius ? `?radius=${radius}` : ""
      }`;
      await page.goto(searchURL, { waitUntil: "networkidle2" });

      // Adjust selectors based on the site's actual HTML structure
      const jobs = await page.evaluate(() => {
        const listings = Array.from(document.querySelectorAll(".jobListing"));
        return listings.map((listing) => ({
          title: listing.querySelector(".jobTitle").innerText,
          company: listing.querySelector(".companyName").innerText,
          location: listing.querySelector(".jobLocation").innerText,
          summary: listing.querySelector(".jobSummary").innerText,
          jobTitle, // Include the searched job title
          location, // Include the searched location
          coverLetter, // Include the provided cover letter template
          // Add any additional fields as necessary
        }));
      });

      allJobs.push(...jobs); // Accumulate jobs from this iteration
    }
  }

  // Log for demonstration; in production, you'd likely perform additional processing
  console.log(allJobs);

  // Save allJobs to MongoDB
  try {
    await JobApplication.insertMany(allJobs);
    res.json({ message: "Jobs fetched and saved successfully", jobs: allJobs });
  } catch (error) {
    console.error("Failed to save job listings:", error);
    res.status(500).json({ error: "Failed to save job listings" });
  }

  await browser.close();
};

// Create a new job application
exports.createJobApplication = async (req, res) => {
  try {
    const newJob = await JobApplication.create(req.body);
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all job applications
exports.getAllJobApplications = async (req, res) => {
  try {
    const jobs = await JobApplication.find({});
    res.status(200).json(jobs);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Get a single job application by ID
exports.getJobApplicationById = async (req, res) => {
  try {
    const job = await JobApplication.findById(req.params.id);
    res.status(200).json(job);
  } catch (error) {
    res.status(404).json({ error: "Job not found" });
  }
};

// Update a job application by ID
exports.updateJobApplication = async (req, res) => {
  try {
    const updatedJob = await JobApplication.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedJob);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a job application by ID
exports.deleteJobApplication = async (req, res) => {
  try {
    await JobApplication.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ error: "Job not found" });
  }
};
