import React from 'react';
import SignUpPage from './pages/Authentication/SignUpPage';
import LogInPage from './pages/Authentication/LogInPage.jsx';
import { Routes, Route, useLocation } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import HomePage from './pages/contentPages/HomePage.jsx';

const App = () => {
  const location = useLocation();

  return (
    <div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path='/' element={<HomePage/>}/>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path='/homepage' element={<HomePage/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;
