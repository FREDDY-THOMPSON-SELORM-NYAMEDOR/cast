import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postAuth, getMe } from '../services/api';

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const t = await AsyncStorage.getItem('auth_token');
      if (t) {
        setToken(t);
        try {
          const resp = await getMe(t);
          if (resp && resp.user) setUser(resp.user);
        } catch (e) {
          // ignore
        }
      }
      setLoading(false);
    })();
  }, []);

  async function login({ email, phone, password }) {
    const body = { action: 'login', email, phone, password };
    const resp = await postAuth(body);
    if (resp && resp.token) {
      await AsyncStorage.setItem('auth_token', resp.token);
      setToken(resp.token);
      setUser(resp.user || null);
    }
    return resp;
  }

  async function register({ email, phone, password, name }) {
    const body = { action: 'register', email, phone, password, name };
    const resp = await postAuth(body);
    if (resp && resp.token) {
      await AsyncStorage.setItem('auth_token', resp.token);
      setToken(resp.token);
      setUser(resp.user || null);
    }
    return resp;
  }

  async function logout() {
    await AsyncStorage.removeItem('auth_token');
    setToken(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
