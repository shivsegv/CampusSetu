import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AuthPage from './pages/Auth/Auth';
import JobDetails from './pages/JobDetails/JobDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/jobs/:id" element={<JobDetails />} />
      <Route path="*" element={<div style={{ padding: 40 }}>Page not found</div>} />
    </Routes>
  );
}
