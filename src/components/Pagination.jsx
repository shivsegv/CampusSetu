import React from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function Pagination({ page, pageSize, total, onChange }) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/70 bg-white/95 p-4 text-sm text-slate-500 shadow-soft backdrop-blur md:flex-row md:items-center md:justify-between">
      <div>
        Showing <span className="font-medium text-slate-700">{start}</span> –
        <span className="font-medium text-slate-700"> {end}</span> of
        <span className="font-medium text-slate-700"> {total}</span>
      </div>
      <div className="flex items-center gap-3 self-end md:self-auto">
        <button
          type="button"
          onClick={() => onChange(Math.max(1, page - 1))}
          disabled={page <= 1}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white text-slate-500 shadow-soft transition hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Go to previous page"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2 font-semibold text-brand-700">
          <span>{page}</span>
          <span className="text-xs font-medium text-brand-500">of {totalPages}</span>
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          disabled={page >= totalPages}
          className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/70 bg-white text-slate-500 shadow-soft transition hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Go to next page"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
