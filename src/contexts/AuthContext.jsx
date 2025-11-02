import React, { createContext, useContext, useEffect, useState } from 'react';
import * as mockAuth from '../api/mockAuth';

const KEY = 'cs_auth_state';
const AuthContext = createContext(null);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [state, setState] = useState(() => {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : { token: null, user: null };
    } catch {
      return { token: null, user: null };
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state]);

  const login = async (email, password) => {
    const { token, user } = await mockAuth.login(email, password);
    setState({ token, user });
    return { token, user };
  };

  const register = async (payload) => {
    const { token, user } = await mockAuth.register(payload);
    setState({ token, user });
    return { token, user };
  };

  const logout = () => {
    setState({ token: null, user: null });
    localStorage.removeItem(KEY);
  };

  const value = { ...state, login, register, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
