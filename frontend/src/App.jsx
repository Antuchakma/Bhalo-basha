import React from 'react';
import SignUpPage from './pages/Authentication/SignUpPage';
import LogInPage from './pages/Authentication/LogInPage.jsx';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import HomePage from './pages/contentPages/HomePage.jsx';
import { AuthProvider } from '../context/AuthContext.jsx'; 
import ListingsPage from './pages/contentPages/ListingsPage.jsx';
import AddListing from './pages/contentPages/AddListing.jsx';
import ProductPage from "./pages/contentPages/ProductPage.jsx";
import ProfilePage from './pages/contentPages/ProfilePage.jsx';
import MessagesPage from './pages/contentPages/MessagesPage.jsx';
import Header from './components/Header.jsx';


const App = () => {
  const location = useLocation();

  return (
    <AuthProvider> 
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="pt-16"> {/* Add padding to account for fixed header */}
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LogInPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/add-listing" element={<AddListing />} />
              <Route path="/listing/:id" element={<ProductPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/messages" element={<MessagesPage />} />
            </Routes>
          </AnimatePresence>
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
