import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();  
  const { isAuthenticated } = user;

  if (loading) {
    return <Loading/>; 
  }


  
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
