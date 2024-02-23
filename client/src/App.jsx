import { useState, useEffect } from "react";
import "./App.css";
import InputForm from "./components/InputForm"; // Import your form component
import DisplayResults from "./components/DisplayResults"; // Import your results component

function App() {
  const [jobApplications, setJobApplications] = useState([]);

  // Replace with your backend API endpoint
  const backendApiUrl = "/api/job-applications";

  useEffect(() => {
    // Fetch job applications from the backend when the component mounts
    fetch(backendApiUrl)
      .then((response) => response.json())
      .then((data) => setJobApplications(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <div className="container">
      <h1 className="text-center">AutoJob - Job Applications</h1>
      <InputForm /> {/* Render your form component here */}
      <h2 className="text-center">Job Applications</h2>
      <DisplayResults jobApplications={jobApplications} />{" "}
      {/* Render your results component here */}
    </div>
  );
}

export default App;
