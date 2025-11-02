import React from "react";

const JobCard = ({ job, onApply }) => {
  return (
    <article className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition transform hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">{job.title}</h3>
          <p className="text-sm text-muted mt-1">
            {job.companyName} • {job.location}
          </p>
        </div>
        <div className="text-sm text-muted text-right">
          <div className="mb-2">{job.type}</div>
          {job.minCgpa && (
            <div className="text-xs bg-gray-100 inline-block px-3 py-1 rounded-full">
              Min CGPA {job.minCgpa}
            </div>
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-muted line-clamp-3">
        {job.shortDescription}
      </p>
      <div className="mt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {job.skills &&
            job.skills.slice(0, 3).map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 bg-gray-50 rounded-full"
              >
                {s}
              </span>
            ))}
        </div>
        <button
          onClick={() => onApply(job)}
          className="px-4 py-2 rounded-full bg-accent text-white text-sm"
        >
          Apply
        </button>
      </div>
    </article>
  );
};

export default JobCard;
