import React, { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { getApplicationsByStudentId } from "../../api/mockApplications";
import { getJobById } from "../../api/mockJobs";
import { Link } from "react-router-dom";

export default function StudentApplications() {
  const auth = useAuth();
  const user = auth?.user;
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    if (!user) {
      setLoading(false);
      return;
    }
    setLoading(true);
    getApplicationsByStudentId(user.id)
      .then(async (apps) => {
        if (!mounted) return;
        // enrich with job info
        const enriched = await Promise.all(
          apps.map(async (a) => {
            const job = await getJobById(a.jobId);
            return { ...a, job };
          })
        );
        setApplications(enriched);
      })
      .catch(() => setApplications([]))
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [user]);

  if (loading) return <div className="p-6">Loading applications...</div>;
  if (!user)
    return <div className="p-6">Please login to see applications.</div>;

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">My Applications</h3>
      {applications.length === 0 ? (
        <div className="text-gray-600">
          You haven't applied to any jobs yet.
        </div>
      ) : (
        <ul className="space-y-3">
          {applications.map((a) => (
            <li
              key={a.id}
              className="p-3 border rounded flex items-center justify-between"
            >
              <div>
                <div className="font-medium">
                  {a.job?.title || "Unknown role"}
                </div>
                <div className="text-sm text-muted">{a.job?.companyName}</div>
                <div className="text-xs text-muted mt-1">
                  Applied on {new Date(a.appliedAt).toLocaleString()}
                </div>
              </div>
              <div className="text-sm">
                <div className="mb-2">
                  <span className="px-2 py-1 rounded-full bg-gray-100">
                    {a.status}
                  </span>
                </div>
                <Link to={`/jobs/${a.jobId}`} className="text-primary text-sm">
                  View job
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
