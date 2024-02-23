import React, { useState } from "react";

const formStyle = {
  maxWidth: "400px",
  margin: "0 auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "5px",
};

const labelStyle = {
  display: "block",
  margin: "10px 0",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  resize: "vertical",
};

const buttonStyle = {
  backgroundColor: "#007BFF",
  color: "white",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
};

function InputForm({ onSubmit }) {
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ jobTitle, location, coverLetter });
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2>Job Application Form</h2>
      <div>
        <label htmlFor="jobTitle" style={labelStyle}>
          Job Title:
        </label>
        <input
          type="text"
          id="jobTitle"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="location" style={labelStyle}>
          Location:
        </label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={inputStyle}
        />
      </div>
      <div>
        <label htmlFor="coverLetter" style={labelStyle}>
          Cover Letter:
        </label>
        <textarea
          id="coverLetter"
          value={coverLetter}
          onChange={(e) => setCoverLetter(e.target.value)}
          style={textareaStyle}
        />
      </div>
      <button type="submit" style={buttonStyle}>
        Submit
      </button>
    </form>
  );
}

export default InputForm;
