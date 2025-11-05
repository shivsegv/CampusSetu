import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { updateUser } from "../../api/mockAuth"; // Corrected import

const InputField = ({ label, children }) => (
  <div>
    <label className="block text-sm font-medium text-gray-600 mb-1">{label}</label>
    {children}
  </div>
);

export function StudentProfile() {
  const { user, login } = useAuth(); // Using login to refresh context
  const [form, setForm] = useState({ name: '', email: '', cgpa: '', skills: [], resumeUrl: '' });
  const [status, setStatus] = useState({ saving: false, saved: false, error: null });

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        cgpa: user.profile?.cgpa || "",
        skills: user.profile?.skills || [],
        resumeUrl: user.profile?.resumeUrl || "",
      });
    }
  }, [user]);

  const update = (key, value) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setStatus({ ...status, saved: false, error: null });
  };

  const handleSave = async () => {
    if (!user) return;
    setStatus({ saving: true, saved: false, error: null });

    try {
      const updatedProfile = {
        name: form.name,
        profile: {
          cgpa: form.cgpa ? Number(form.cgpa) : undefined,
          skills: form.skills,
          resumeUrl: form.resumeUrl,
        },
      };

      await updateUser(user.id, updatedProfile); // Call the new updateUser function
      
      // Refresh auth context by re-logging in with existing credentials
      // This is a mock-environment way to refresh the user state without a page reload
      if (user.password) {
        await login(user.email, user.password);
      }

      setStatus({ saving: false, saved: true, error: null });
    } catch (e) {
      setStatus({ saving: false, saved: false, error: e.message });
    }
  };

  return (
    <div>
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">My Profile</h1>
        <p className="text-lg text-gray-500">Keep your information up to date to attract the best opportunities.</p>
      </header>

      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
        <div className="space-y-6">
          <InputField label="Full Name">
            <input
              type="text"
              value={form.name}
              onChange={e => update('name', e.target.value)}
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-light"
            />
          </InputField>

          <InputField label="Email Address (read-only)">
            <input
              type="email"
              value={form.email}
              readOnly
              className="w-full border-gray-300 rounded-lg px-4 py-2 bg-gray-100 cursor-not-allowed"
            />
          </InputField>

          <InputField label="Overall CGPA">
            <input
              type="number"
              step="0.1"
              value={form.cgpa}
              onChange={e => update('cgpa', e.target.value)}
              placeholder="e.g., 8.5"
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-light"
            />
          </InputField>

          <InputField label="Skills (comma-separated)">
            <input
              type="text"
              value={form.skills.join(', ')}
              onChange={e => update('skills', e.target.value.split(',').map(s => s.trim()))}
              placeholder="e.g., React, Node.js, Python"
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-light"
            />
          </InputField>

          <InputField label="Resume URL">
            <input
              type="url"
              value={form.resumeUrl}
              onChange={e => update('resumeUrl', e.target.value)}
              placeholder="https://example.com/my-resume.pdf"
              className="w-full border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-light"
            />
          </InputField>

          <div className="flex items-center gap-4 pt-4">
            <button
              onClick={handleSave}
              disabled={status.saving}
              className="px-6 py-2 rounded-full bg-primary text-white font-semibold disabled:bg-opacity-70 transition-transform transform hover:scale-105"
            >
              {status.saving ? 'Saving...' : 'Save Changes'}
            </button>
            {status.saved && <div className="text-sm text-green-600 font-medium">Profile saved successfully!</div>}
            {status.error && <div className="text-sm text-red-600 font-medium">Error: {status.error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
