import React, { useEffect, useMemo, useState } from "react";
import FilterBar from "../../components/FilterBar";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import { getJobs } from "../../api/mockJobs";
import ApplyModal from "../../components/ApplyModal";

export function StudentDashboard() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters state
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 9;

  // modal
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    setLoading(true);
    getJobs({ approved: true })
      .then(setAllJobs)
      .catch(() => setAllJobs([]))
      .finally(() => setLoading(false));
  }, []);

  // derive filtered jobs
  const filtered = useMemo(() => {
    if (!allJobs || allJobs.length === 0) return [];
    return allJobs.filter((job) => {
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !(job.title?.toLowerCase().includes(q) || job.companyName?.toLowerCase().includes(q))
        ) return false;
      }
      if (filters.company && job.companyName !== filters.company) return false;
      if (filters.location && job.location !== filters.location) return false;
      if (filters.type && job.type !== filters.type) return false;
      return true;
    });
  }, [allJobs, filters]);

  // pagination
  const total = filtered.length;
  const paged = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page]);

  useEffect(() => {
    setPage(1);
  }, [filters]); // reset page when filters change

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Find Your Next Opportunity</h1>
        <p className="text-lg text-gray-500">Search through hundreds of open roles and find your perfect fit.</p>
      </header>

      <FilterBar onChange={setFilters} jobs={allJobs} />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-700">Job Feed</h2>
        <div className="text-sm text-gray-500">Showing {paged.length} of {total} results</div>
      </div>

      {loading ? (
        <div className="p-6 text-center text-gray-500">Loading jobs...</div>
      ) : total === 0 ? (
        <div className="p-10 bg-white rounded-2xl text-center text-gray-600 shadow-lg">
          <h3 className="text-xl font-semibold">No Jobs Found</h3>
          <p className="mt-2">Try adjusting your filters to find more opportunities.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paged.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                onApply={() => setSelectedJob(job)}
              />
            ))}
          </div>

          <Pagination
            page={page}
            pageSize={pageSize}
            total={total}
            onChange={setPage}
          />
        </>
      )}

      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApplied={() => { /* optionally refresh */ }}
        />
      )}
    </div>
  );
}

