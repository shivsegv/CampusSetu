import React, { useEffect, useState } from "react";
import { getJobs, patchJobApproval } from "../../api/mockJobs";
import { ApprovalQueue } from "../../components/ApprovalQueue";

export function JobApprovals() {
  const [pendingJobs, setPendingJobs] = useState([]);

  useEffect(() => {
    getJobs({ approved: false }).then(setPendingJobs);
  }, []);

  const handleApprove = (jobId) => {
    patchJobApproval(jobId, true).then(() => {
      setPendingJobs((prev) => prev.filter((job) => job.id !== jobId));
    });
  };

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Job Approvals</h1>
        <p className="text-lg text-gray-500">Review and approve job listings submitted by recruiters.</p>
      </header>
      
      {pendingJobs.length > 0 ? (
        <ApprovalQueue jobs={pendingJobs} onApprove={handleApprove} />
      ) : (
        <div className="p-10 bg-white rounded-2xl text-center text-gray-600 shadow-lg">
          <h3 className="text-xl font-semibold">Approval Queue is Empty</h3>
          <p className="mt-2">There are no pending jobs that require approval.</p>
        </div>
      )}
    </>
  );
}
