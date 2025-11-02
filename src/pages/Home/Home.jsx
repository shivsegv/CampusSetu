import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Hero from "../../components/Hero";
import JobCard from "../../components/JobCard";
import { getJobs } from "../../api/mockJobs";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getJobs({ approved: true, _limit: 6 })
      .then((data) => {
        if (!mounted) return;
        setJobs(data);
      })
      .catch((err) => {
        // keep minimal logging
        // console.error('getJobs error', err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <main className="min-h-screen bg-bg text-slate-900">
        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">Featured jobs</h2>
          </div>

          {loading ? (
            <div className="text-gray-500">Loading jobs...</div>
          ) : jobs.length === 0 ? (
            <div className="text-gray-500">No jobs available.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onApply={() => {
                    /* integrate later */
                  }}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}
