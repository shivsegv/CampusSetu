import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function StudentLayout() {
  const auth = useAuth();
  const user = auth?.user;

  return (
    <div className="min-h-screen bg-bg">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="font-semibold text-lg">
            Campus Setu
          </Link>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-3">
              <Link to="/student" className="text-sm">
                Jobs
              </Link>
              <Link to="/student/applications" className="text-sm">
                Applications
              </Link>
              <Link to="/student/profile" className="text-sm">
                Profile
              </Link>
            </nav>
            <div className="text-sm text-muted">
              {user ? user.name : "Guest"}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 grid lg:grid-cols-6 gap-6">
        <aside className="lg:col-span-1 hidden lg:block">
          <div className="bg-white rounded-2xl p-4 shadow">
            <div className="text-sm text-muted mb-2">Quick Links</div>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <Link to="/student">Job Feed</Link>
              </li>
              <li>
                <Link to="/student/profile">Profile</Link>
              </li>
              <li>
                <Link to="/student/applications">Applications</Link>
              </li>
            </ul>
          </div>
        </aside>

        <section className="lg:col-span-5 bg-transparent">
          <Outlet />
        </section>
      </div>
    </div>
  );
}
