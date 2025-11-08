import React, { useMemo, useState } from 'react';
import { getRecruitmentHistory } from '../../api/mockRecruitmentHistory';

export default function CompanyTable() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState({ key: 'hires', dir: 'desc' });

  React.useEffect(() => {
    getRecruitmentHistory().then(res => {
      setCompanies(res.companies);
    }).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const base = companies.filter(c => c.name.toLowerCase().includes(query.toLowerCase()));
    return base.sort((a,b) => {
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av === bv) return 0;
      if (sort.dir === 'asc') return av > bv ? 1 : -1;
      return av < bv ? 1 : -1;
    });
  }, [companies, query, sort]);

  const toggleSort = (key) => {
    setSort(s => s.key === key ? { key, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'desc' });
  };

  return (
    <div id="companies" className="scroll-mt-24 space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-lg font-semibold text-slate-800">Company Activity</h2>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search company..."
            className="rounded-full border border-slate-200 bg-white/70 backdrop-blur px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() => {
              const headers = ['Name','Hires','Offers','SuccessRate'];
              const rows = filtered.map(c => [c.name,c.hires,c.offers,`${Math.round(c.successRate*100)}%`]);
              const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
              const blob = new Blob([csv], { type: 'text/csv' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url; a.download = 'company_activity.csv'; a.click();
              URL.revokeObjectURL(url);
            }}
            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium shadow hover:brightness-95 transition"
          >
            Export CSV
          </button>
        </div>
      </div>
      <div className="rounded-3xl border border-white/60 bg-white/90 backdrop-blur shadow-soft overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-slate-600 bg-white/60">
            <tr>
              <Th label="Company" onClick={() => toggleSort('name')} active={sort.key === 'name'} dir={sort.dir} />
              <Th label="Hires" onClick={() => toggleSort('hires')} active={sort.key === 'hires'} dir={sort.dir} />
              <Th label="Offers" onClick={() => toggleSort('offers')} active={sort.key === 'offers'} dir={sort.dir} />
              <Th label="Success" onClick={() => toggleSort('successRate')} active={sort.key === 'successRate'} dir={sort.dir} />
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="py-10 text-center text-slate-500">Loading companies...</td></tr>
            )}
            {!loading && filtered.length === 0 && (
              <tr><td colSpan={4} className="py-10 text-center text-slate-500">No companies match your search.</td></tr>
            )}
            {filtered.map(c => (
              <tr key={c.id} className="border-t border-slate-100 hover:bg-primary/5 transition">
                <td className="py-3 px-4 font-medium text-slate-800">{c.name}</td>
                <td className="py-3 px-4 text-slate-700">{c.hires}</td>
                <td className="py-3 px-4 text-slate-700">{c.offers}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center gap-1">
                    <span className="font-medium text-slate-800">{Math.round(c.successRate*100)}%</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-slate-500">Success % = hires ÷ offers accepted (approx). Data is mock and for layout demonstration.</p>
    </div>
  );
}

function Th({ label, onClick, active, dir }) {
  return (
    <th
      onClick={onClick}
      className="py-2 px-4 text-left cursor-pointer select-none font-medium tracking-wide text-xs uppercase hover:text-slate-900"
    >
      <span className="inline-flex items-center gap-1">
        {label}
        {active && (
          <span className="text-slate-400">{dir === 'asc' ? '▲' : '▼'}</span>
        )}
      </span>
    </th>
  );
}
