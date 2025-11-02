import React, { useState } from 'react';
import { createApplication } from '../api/mockApplications';
import { useAuth } from '../contexts/AuthContext';

export default function ApplyModal({ job, onClose, onApplied }) {
  const auth = useAuth();
  const user = auth?.user || null;
  const [resumeUrl, setResumeUrl] = useState(user?.profile?.resumeUrl || '');
  const [cover, setCover] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!user) {
      alert('Please login as a student to apply.');
      return;
    }
    setLoading(true);
    try {
      await createApplication({
        jobId: job.id,
        studentId: user.id,
        resumeUrl,
        cover
      });
      if (onApplied) onApplied();
      onClose();
      alert('Application submitted');
    } catch (err) {
      console.error(err);
      alert('Failed to apply');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <form onSubmit={submit} className="relative bg-white rounded-2xl p-6 w-full max-w-xl z-10">
        <h3 className="text-lg font-semibold">Apply for {job.title}</h3>
        <div className="mt-4">
          <label className="block text-sm mb-1">Resume URL (or leave blank)</label>
          <input value={resumeUrl} onChange={e => setResumeUrl(e.target.value)} placeholder="https://..." className="w-full border rounded-lg px-3 py-2" />
        </div>
        <div className="mt-4">
          <label className="block text-sm mb-1">Cover note (optional)</label>
          <textarea value={cover} onChange={e => setCover(e.target.value)} className="w-full border rounded-lg px-3 py-2" rows={4} />
        </div>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-full border">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 rounded-full bg-accent text-white">
            {loading ? 'Applying...' : 'Apply'}
          </button>
        </div>
      </form>
    </div>
  );
}
