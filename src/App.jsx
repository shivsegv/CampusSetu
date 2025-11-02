import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import AuthPage from './pages/Auth/Auth';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<div style={{ padding: 40 }}>Page not found</div>} />
    </Routes>
  );
}
