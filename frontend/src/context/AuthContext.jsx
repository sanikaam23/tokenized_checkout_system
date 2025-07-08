import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  const signup = async (email, password) => {
    try {
      const res = await axios.post('/auth/signup', { email, password });
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Signup failed');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const updateProfile = async (updatedData) => {
    try {
      const res = await axios.put('/auth/update-profile', updatedData);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      alert('Profile updated successfully');
    } catch (err) {
      console.error(err);
      alert('Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
