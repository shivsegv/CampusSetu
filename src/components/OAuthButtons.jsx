import React from 'react';

export default function OAuthButtons() {
  return (
    <div className="grid gap-3">
      <button className="w-full px-4 py-2 border rounded-lg flex items-center justify-center gap-2">
        <span>Continue with Google</span>
      </button>
      <button className="w-full px-4 py-2 border rounded-lg flex items-center justify-center gap-2">
        <span>Continue with GitHub</span>
      </button>
    </div>
  );
}
