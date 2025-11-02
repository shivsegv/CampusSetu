import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import RoleSelect from '../../components/RoleSelect';
import PasswordInput from '../../components/PasswordInput';
import OAuthButtons from '../../components/OAuthButtons';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });
  const [error, setError] = useState('');

  function update(key, value) {
    setForm(f => ({ ...f, [key]: value }));
    setError('');
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    if (!emailRegex.test(form.email)) {
      setError('Enter a valid email.');
      return;
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (mode === 'register' && !form.name.trim()) {
      setError('Please enter your name.');
      return;
    }
    setLoading(true);
    try {
      let res;
      if (mode === 'login') {
        res = await auth.login(form.email, form.password);
      } else {
        res = await auth.register({
          name: form.name.trim(),
          email: form.email,
          password: form.password,
          role: form.role
        });
      }
      const target = res.user?.role || 'student';
      navigate(`/${target}`);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow p-8">
        <h2 className="text-2xl font-semibold mb-2">{mode === 'login' ? 'Sign in' : 'Create account'}</h2>
        <p className="text-sm text-muted mb-6">Continue as Student, Recruiter or Placement Cell.</p>

        <OAuthButtons />

        <div className="my-4 text-center text-sm text-muted">or use your email</div>

        <form onSubmit={onSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={form.name}
                onChange={e => update('name', e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
                placeholder="Your name"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              value={form.email}
              onChange={e => update('email', e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="name@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <PasswordInput value={form.password} onChange={val => update('password', val)} />
          </div>

          {mode === 'register' && (
            <div>
              <label className="block text-sm font-medium mb-1">Role</label>
              <RoleSelect value={form.role} onChange={val => update('role', val)} />
            </div>
          )}

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex items-center justify-between gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 rounded-full bg-accent text-white font-medium disabled:opacity-60"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Sign in' : 'Create account'}
            </button>

            <button
              type="button"
              onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
              className="px-4 py-2 rounded-full border"
            >
              {mode === 'login' ? 'Register' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
