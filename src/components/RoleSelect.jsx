import React from 'react';

export default function RoleSelect({ value, onChange }) {
  return (
    <div className="flex gap-2">
      {[
        { key: 'student', label: 'Student' },
        { key: 'recruiter', label: 'Recruiter' },
        { key: 'placement', label: 'Placement Cell' }
      ].map(opt => (
        <label key={opt.key} className={`flex-1 cursor-pointer select-none`}>
          <input
            type="radio"
            name="role"
            value={opt.key}
            checked={value === opt.key}
            onChange={() => onChange(opt.key)}
            className="hidden"
          />
          <div className={`w-full text-center px-3 py-2 border rounded-lg ${value === opt.key ? 'border-primary bg-primary/10' : 'bg-white'}`}>
            {opt.label}
          </div>
        </label>
      ))}
    </div>
  );
}
