import React, { useEffect, useMemo, useState } from "react";
import FilterSidebar from "../../components/FilterSidebar";
import JobCard from "../../components/JobCard";
import Pagination from "../../components/Pagination";
import { getJobs } from "../../api/mockJobs";
import ApplyModal from "../../components/ApplyModal";

export default function StudentDashboard() {
  const [allJobs, setAllJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters state
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // modal
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getJobs({ approved: true })
      .then((data) => {
        if (!mounted) return;
        setAllJobs(data);
      })
      .catch(() => {
        if (!mounted) return;
        setAllJobs([]);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // derive filtered jobs
  const filtered = useMemo(() => {
    if (!allJobs || allJobs.length === 0) return [];
    return allJobs.filter((job) => {
      // text query
      if (filters.query) {
        const q = filters.query.toLowerCase();
        if (
          !(
            job.title?.toLowerCase().includes(q) ||
            job.companyName?.toLowerCase().includes(q)
          )
        )
          return false;
      }
      if (
        filters.company &&
        filters.company !== "" &&
        job.companyName !== filters.company
      )
        return false;
      if (
        filters.location &&
        filters.location !== "" &&
        job.location !== filters.location
      )
        return false;
      if (filters.type && filters.type !== "" && job.type !== filters.type)
        return false;
      if (
        typeof filters.minCgpa === "number" &&
        Number(job.minCgpa || 0) < filters.minCgpa
      )
        return false;
      if (filters.skills && filters.skills.length) {
        const want = filters.skills.map((s) => s.toLowerCase());
        const has = (job.skills || []).map((s) => s.toLowerCase());
        if (!want.every((w) => has.includes(w))) return false;
      }
      return true;
    });
  }, [allJobs, filters]);

  // pagination
  const total = filtered.length;
  const paged = useMemo(
    () => filtered.slice((page - 1) * pageSize, page * pageSize),
    [filtered, page]
  );

  useEffect(() => {
    setPage(1);
  }, [filters]); // reset page when filters change

  return (
    <div className="grid lg:grid-cols-6 gap-6">
      <div className="lg:col-span-1">
        <FilterSidebar onChange={setFilters} initial={{}} jobs={allJobs} />
      </div>

      <div className="lg:col-span-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Job Feed</h2>
          <div className="text-sm text-muted">{total} results</div>
        </div>

        {loading ? (
          <div className="p-6">Loading jobs...</div>
        ) : total === 0 ? (
          <div className="p-6 text-gray-600">
            No jobs found for selected filters.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
      </div>

      {selectedJob && (
        <ApplyModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
          onApplied={() => {
            /* optionally refresh */
          }}
        />
      )}
    </div>
  );
}
