import React from "react";
import JobForm from "../../components/JobForm";
import { createJob } from "../../api/mockJobs";

export function PostJob() {
  const handleSubmit = (job) => {
    const recruiterId = 101; // mock user
    createJob({ ...job, postedBy: recruiterId });
    alert("Job posted successfully");
    // todo: redirect or clear form
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Post a New Job</h1>
        <p className="text-lg text-gray-500">Fill out the details below to create a new job listing.</p>
      </header>
      <JobForm onSubmit={handleSubmit} />
    </>
  );
}
