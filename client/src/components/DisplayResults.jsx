import React from "react";

const listItemStyle = {
  border: "1px solid #ddd",
  borderRadius: "5px",
  padding: "10px",
  margin: "10px 0",
};

const titleStyle = {
  fontSize: "18px",
  fontWeight: "bold",
};

function DisplayResults({ jobApplications }) {
  return (
    <div>
      <h2>Job Applications</h2>
      <ul>
        {jobApplications.map((application) => (
          <li key={application._id} style={listItemStyle}>
            <p style={titleStyle}>
              <strong>Job Title:</strong> {application.jobTitle}
            </p>
            <p>
              <strong>Location:</strong> {application.location}
            </p>
            <p>
              <strong>Cover Letter:</strong> {application.coverLetter}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayResults;
