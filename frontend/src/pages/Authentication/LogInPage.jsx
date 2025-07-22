import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import '@fontsource/space-grotesk';
import { motion } from 'framer-motion';
import api from '../../lib/axios';
import toast, { Toaster } from 'react-hot-toast';
import { Route } from 'react-router';
import { Navigate } from 'react-router';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

const LogInPage = () => {

  const navigate = useNavigate();


  const [formdata, setFormadata] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormadata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
   e.preventDefault();
   try {
    const res = await api.post('/api/auth/login',formdata)
    withCredentials: true,

    toast.success("Login SuccessFull");
    navigate('/homepage');
   } catch (error) {
    toast.error("wrong username or password");
   }
  };

  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center font-[Space Grotesk]"
      style={{
        background: 'linear-gradient(135deg, #f2f2f7, #e0e0e5)', // updated background
      }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] px-10 py-12 rounded-2xl w-[360px] flex flex-col gap-7 transition duration-300"
      >
        <h2 className="text-2xl font-semibold text-center tracking-wide text-[#1e1e1e]">
          Sign in
        </h2>

        <div className="flex flex-col gap-6">
          <input
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-transparent border-b border-gray-400 focus:border-indigo-600 transition outline-none text-sm py-2 placeholder:text-gray-500"
          />

          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent border-b border-gray-400 focus:border-indigo-600 transition outline-none text-sm py-2 placeholder:text-gray-500"
          />
        </div>

        
  <button
  type="submit"
  className="
    mt-4
    bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900
    text-white
    py-3
    rounded-md
    font-semibold
    shadow-lg
    hover:from-gray-600 hover:to-gray-800
    hover:scale-105
    active:scale-95
    active:shadow-inner
    transition
    duration-200
    ease-in-out
    focus:outline-none
    focus:ring-2
    focus:ring-gray-600
    focus:ring-opacity-50
  "
>
  Login
</button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don’t have an account?
          <Link to="/signup" className="text-indigo-600 hover:underline ml-1 font-medium">
            Signup
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LogInPage;
