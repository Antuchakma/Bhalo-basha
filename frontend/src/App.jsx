import React from 'react';
import SignUpPage from './pages/Authentication/SignUpPage';
import LogInPage from './pages/Authentication/LogInPage.jsx';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/contentPages/HomePage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx'; 

const App = () => {
  const location = useLocation();

  return (
    <AuthProvider> 
      <AnimatePresence mode="wait">
        <div>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
        </div>
      </AnimatePresence>
    </AuthProvider>
  );
};

export default App;
