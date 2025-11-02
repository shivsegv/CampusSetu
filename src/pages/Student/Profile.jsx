import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function StudentProfile() {
  const auth = useAuth();
  const user = auth?.user;
  const [form, setForm] = useState({
    name: "",
    email: "",
    cgpa: "",
    skills: [],
    resumeUrl: "",
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!user) return;
    setForm({
      name: user.name || "",
      email: user.email || "",
      cgpa: user.profile?.cgpa || "",
      skills: user.profile?.skills || [],
      resumeUrl: user.profile?.resumeUrl || "",
    });
  }, [user]);

  function update(k, v) {
    setForm((prev) => ({ ...prev, [k]: v }));
    setSaved(false);
  }

  function save() {
    // store in localStorage user record (simple)
    const raw = localStorage.getItem("cs_users");
    if (!raw) return alert("Unable to save (users not initialized).");
    const users = JSON.parse(raw);
    const idx = users.findIndex((u) => u.id === user.id);
    if (idx === -1) return alert("User not found");
    users[idx] = {
      ...users[idx],
      name: form.name,
      profile: {
        ...(users[idx].profile || {}),
        cgpa: form.cgpa ? Number(form.cgpa) : undefined,
        skills: form.skills,
        resumeUrl: form.resumeUrl,
      },
    };
    localStorage.setItem("cs_users", JSON.stringify(users));
    // update auth context state by reloading page / or ideally call context update — keep simple: reload
    setSaved(true);
    setTimeout(() => location.reload(), 600);
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow">
      <h3 className="text-lg font-semibold mb-4">Profile</h3>
      <div className="space-y-4">
        <div>
          <label className="text-sm block mb-1">Name</label>
          <input
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">Email (read-only)</label>
          <input
            value={form.email}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-50"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">CGPA</label>
          <input
            value={form.cgpa}
            onChange={(e) => update("cgpa", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">Skills (comma separated)</label>
          <input
            value={form.skills.join(", ")}
            onChange={(e) =>
              update(
                "skills",
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="text-sm block mb-1">Resume URL</label>
          <input
            value={form.resumeUrl}
            onChange={(e) => update("resumeUrl", e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={save}
            className="px-4 py-2 rounded bg-accent text-white"
          >
            Save
          </button>
          {saved && (
            <div className="text-sm text-green-600">Saved — reloading...</div>
          )}
        </div>
      </div>
    </div>
  );
}
