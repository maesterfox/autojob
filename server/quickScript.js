require("dotenv").config();
const { MongoClient } = require("mongodb");

// MongoDB connection string from your environment variables
const uri = process.env.MONGODB_URI;

// Sample job postings data
const jobPostings = [
  {
    Website: "Indeed",
    DateApplied: "2023-02-01",
    Company: "Tech Innovations Inc.",
    Position: "Software Engineer",
    Salary: "$120,000",
    Location: "New York, NY",
    Summary:
      "Seeking a skilled software engineer to develop cutting-edge solutions.",
  },
  {
    Website: "TotalJobs",
    DateApplied: "2023-02-02",
    Company: "Global Tech Solutions",
    Position: "Data Scientist",
    Salary: "$110,000",
    Location: "San Francisco, CA",
    Summary:
      "Data scientist needed to analyze large datasets and contribute to AI projects.",
  },
  {
    Website: "LinkedIn",
    DateApplied: "2023-02-03",
    Company: "Creative Media",
    Position: "Digital Marketer",
    Salary: "$90,000",
    Location: "Remote",
    Summary:
      "Digital marketer with experience in social media campaigns and SEO.",
  },
];

async function main() {
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("myjobs"); // Targeting 'myjobs' database
    const collection = database.collection("apps"); // Targeting 'apps' collection

    // Insert sample data into the collection
    const result = await collection.insertMany(jobPostings);
    console.log(`${result.insertedCount} job postings added`, result);
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await client.close();
    console.log("Disconnected from MongoDB");
  }
}

main().catch(console.error);
