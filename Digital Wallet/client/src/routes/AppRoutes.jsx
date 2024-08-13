import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import PrivateRoute from './PrivateRoute';
import ErrorPage from '../pages/ErrorPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
