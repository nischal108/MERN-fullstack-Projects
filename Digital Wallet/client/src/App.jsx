import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import MainLayout from './layouts/MainLayout.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

const App = () => {
  return (
    <Router>
      <MainLayout>
        <AuthProvider>
        <AppRoutes />
        </AuthProvider>
      </MainLayout>
    </Router>
  );
};

export default App;
