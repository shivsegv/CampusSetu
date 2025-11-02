import React from 'react';

export default function CompanyCard({ company }) {
  if (!company) return null;
  return (
    <aside className="bg-white rounded-2xl p-5 shadow">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-semibold">
          {company.name?.[0] || 'C'}
        </div>
        <div>
          <h4 className="font-semibold">{company.name}</h4>
          <div className="text-sm text-muted">{company.location}</div>
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-700">{company.description}</p>
      {company.website && (
        <a className="mt-4 block text-sm text-primary" href={company.website} target="_blank" rel="noreferrer">Visit website</a>
      )}
    </aside>
  );
}
