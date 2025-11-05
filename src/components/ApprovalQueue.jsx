import React from "react";

export function ApprovalQueue({ jobs, onApprove }) {
  return (
    <table className="w-full border-collapse bg-white shadow rounded-2xl overflow-hidden">
      <thead className="bg-gray-100 text-left">
        <tr>
          <th className="p-3">Company</th>
          <th className="p-3">Title</th>
          <th className="p-3">Posted On</th>
          <th className="p-3 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {jobs.map((job) => (
          <tr key={job.id} className="border-t">
            <td className="p-3">{job.companyName}</td>
            <td className="p-3">{job.title}</td>
            <td className="p-3">
              {new Date(job.createdAt).toLocaleDateString()}
            </td>
            <td className="p-3 text-right space-x-3">
              <button 
                onClick={() => onApprove(job.id)}
                className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              >
                Approve
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
