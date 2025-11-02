import React, { useEffect, useState } from "react";
import { getApplications } from "../../api/mockApplications";

export default function StudentApplications() {
  const [apps, setApps] = useState([]);

  useEffect(() => {
    const data = getApplications(1); // mock studentId = 1
    setApps(data);
  }, []);

  if (!apps.length)
    return (
      <div className="p-6 text-gray-600 text-center">
        No applications found.
      </div>
    );

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-semibold mb-4">My Applications</h2>
      <div className="grid gap-4">
        {apps.map((app) => (
          <div
            key={app.id}
            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">{app.jobTitle}</h3>
                <p className="text-gray-500">{app.companyName}</p>
                <p className="text-sm text-gray-400 mt-1">
                  Applied on {new Date(app.appliedAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  app.status === "Shortlisted"
                    ? "bg-green-100 text-green-700"
                    : app.status === "Rejected"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
