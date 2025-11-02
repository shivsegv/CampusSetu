import React, { useMemo, useState } from "react";

export default function FilterSidebar({ onChange, initial = {}, jobs = [] }) {
  // initial: { query, company, location, type, minCgpa, skills }
  const [query, setQuery] = useState(initial.query || "");
  const [company, setCompany] = useState(initial.company || "");
  const [location, setLocation] = useState(initial.location || "");
  const [type, setType] = useState(initial.type || "");
  const [minCgpa, setMinCgpa] = useState(initial.minCgpa || "");
  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState(initial.skills || []);

  // derive available companies/locations/types from jobs (simple)
  const companies = useMemo(
    () =>
      Array.from(
        new Set((jobs || []).map((j) => j.companyName).filter(Boolean))
      ),
    [jobs]
  );
  const locations = useMemo(
    () =>
      Array.from(new Set((jobs || []).map((j) => j.location).filter(Boolean))),
    [jobs]
  );
  const types = useMemo(
    () => Array.from(new Set((jobs || []).map((j) => j.type).filter(Boolean))),
    [jobs]
  );

  function applyFilters() {
    onChange({
      query,
      company,
      location,
      type,
      minCgpa: minCgpa ? Number(minCgpa) : undefined,
      skills,
    });
  }

  function reset() {
    setQuery("");
    setCompany("");
    setLocation("");
    setType("");
    setMinCgpa("");
    setSkills([]);
    setSkillInput("");
    onChange({});
  }

  function addSkill() {
    const s = skillInput.trim();
    if (!s) return;
    if (!skills.includes(s)) setSkills((prev) => [...prev, s]);
    setSkillInput("");
  }

  function removeSkill(s) {
    setSkills((prev) => prev.filter((x) => x !== s));
  }

  return (
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="text-sm font-semibold mb-3">Filters</div>

      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted">Search</label>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full mt-1 border rounded px-3 py-2"
            placeholder="Role or title"
          />
        </div>

        <div>
          <label className="text-xs text-muted">Company</label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full mt-1 border rounded px-3 py-2"
          >
            <option value="">Any</option>
            {companies.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-muted">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full mt-1 border rounded px-3 py-2"
          >
            <option value="">Any</option>
            {locations.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-muted">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full mt-1 border rounded px-3 py-2"
          >
            <option value="">Any</option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs text-muted">Min CGPA</label>
          <input
            value={minCgpa}
            onChange={(e) => setMinCgpa(e.target.value)}
            className="w-full mt-1 border rounded px-3 py-2"
            placeholder="e.g. 7.0"
          />
        </div>

        <div>
          <label className="text-xs text-muted">Skills</label>
          <div className="flex gap-2 mt-1">
            <input
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              className="flex-1 border rounded px-3 py-2"
              placeholder="Add skill"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-3 py-2 rounded bg-primary text-white"
            >
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {skills.map((s) => (
              <span
                key={s}
                className="text-xs px-2 py-1 bg-gray-100 rounded-full flex items-center gap-2"
              >
                {s}
                <button
                  type="button"
                  onClick={() => removeSkill(s)}
                  className="text-xs px-1"
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={applyFilters}
            className="flex-1 px-3 py-2 rounded bg-accent text-white"
          >
            Apply
          </button>
          <button onClick={reset} className="px-3 py-2 rounded border">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
