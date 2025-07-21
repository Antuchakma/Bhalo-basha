import React, { useState } from 'react';
import { Link } from 'react-router';
import '@fontsource/space-grotesk'; // npm i @fontsource/space-grotesk
import { motion } from 'framer-motion';

const pageVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96], // smooth custom cubic-bezier easing
    },
  },
  exit: {
    opacity: 0,
    scale: 0.96,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};


const LogInPage = () => {
  const [formdata, setFormadata] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormadata((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data:', formdata);
  };

  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center font-[Space Grotesk]"
      style={{
        backgroundColor: '#e5e5e5',
        backgroundImage: `linear-gradient(135deg, #dcdcdc 0%, #cfcfcf 100%)`,
      }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white text-[#1a1a1a] shadow-[0_15px_40px_rgba(0,0,0,0.3)] px-10 py-12 rounded-xl w-[360px] flex flex-col gap-7 transition duration-300"
      >
        <h2 className="text-2xl font-semibold text-center tracking-wide">Sign in</h2>

        <div className="flex flex-col gap-6">
          <input
            type="text"
            name="username"
            value={formdata.username}
            onChange={handleChange}
            placeholder="Username"
            className="bg-transparent border-b border-gray-400 focus:border-indigo-500 transition outline-none text-sm py-2 placeholder:text-gray-500"
          />

          <input
            type="password"
            name="password"
            value={formdata.password}
            onChange={handleChange}
            placeholder="Password"
            className="bg-transparent border-b border-gray-400 focus:border-indigo-500 transition outline-none text-sm py-2 placeholder:text-gray-500"
          />
        </div>

        <button
          type="submit"
          className="mt-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2 rounded-md text-sm font-semibold shadow-lg transition"
        >
          Log In
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don’t have an account?
          <Link to="/signup" className="text-indigo-500 hover:underline ml-1 font-medium">
            Signup
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default LogInPage;
