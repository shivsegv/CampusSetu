import React, { useState, useEffect, useMemo } from 'react';

const FilterBar = ({ onChange, jobs = [] }) => {
  const [filters, setFilters] = useState({
    query: '',
    company: '',
    location: '',
    type: '',
  });

  useEffect(() => {
    onChange(filters);
  }, [filters]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const companies = useMemo(() => Array.from(new Set((jobs || []).map(j => j.companyName).filter(Boolean))), [jobs]);
  const locations = useMemo(() => Array.from(new Set((jobs || []).map(j => j.location).filter(Boolean))), [jobs]);
  const types = useMemo(() => Array.from(new Set((jobs || []).map(j => j.type).filter(Boolean))), [jobs]);

  return (
    <div className="p-4 rounded-2xl shadow-lg mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <input
          type="text"
          name="query"
          value={filters.query}
          onChange={handleChange}
          placeholder="Search by title or company..."
          className="w-full border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-light"
        />
        <select name="company" value={filters.company} onChange={handleChange} className="w-full border-gray-200 rounded-lg px-4 py-2 bg-white">
          <option value="">All Companies</option>
          {companies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select name="location" value={filters.location} onChange={handleChange} className="w-full border-gray-200 rounded-lg px-4 py-2 bg-white">
          <option value="">All Locations</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select name="type" value={filters.type} onChange={handleChange} className="w-full border-gray-200 rounded-lg px-4 py-2 bg-white">
          <option value="">All Types</option>
          {types.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
