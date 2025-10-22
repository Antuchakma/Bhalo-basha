import React from 'react';
import SignUpPage from './pages/Authentication/SignUpPage';
import LogInPage from './pages/Authentication/LogInPage.jsx';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/contentPages/HomePage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx'; 
import ListingsPage from './pages/contentPages/ListingsPage.jsx';
import AddListing from './pages/contentPages/AddListing.jsx'; // ✅ import new page

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
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/add-listing" element={<AddListing />} />
          </Routes>
        </div>
      </AnimatePresence>
    </AuthProvider>
  );
};

export default App;
