import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';
import axios from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post('/auth/login', { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Login failed');
      throw err;
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post('/auth/signup', { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Signup failed');
      throw err;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = result.user;

      const res = await axios.post('/auth/google', {
        email: userData.email,
        googleId: userData.uid,
        name: userData.displayName,
      });

      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Google login failed');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put('/auth/profile', updatedData);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Profile updated successfully');
      return res.data;
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
      throw err;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, loginWithGoogle, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};
