import React, { useState } from 'react';

export default function PasswordInput({ value, onChange }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <input
        type={visible ? 'text' : 'password'}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full border rounded-lg px-3 py-2 pr-12"
        placeholder="At least 6 characters"
      />
      <button
        type="button"
        onClick={() => setVisible(v => !v)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-sm px-2"
      >
        {visible ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}
