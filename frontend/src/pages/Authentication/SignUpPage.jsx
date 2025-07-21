import React, { useState } from 'react';
import { Link } from 'react-router';
import '@fontsource/space-grotesk'; // Ensure it's installed
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../../lib/axios';


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


const SignUpPage = () => {
  const [formdata, setFormdata] = useState({
    fullname: '',
    username: '',
    password: '',
    confirmpassword: '',
    role: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prev) => ({ ...prev, [name]: value }));
  };

  
   const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await api.post('/api/auth/signup', formdata) 
      withCredentials: true, // IMPORTANT if you are using cookies
    
    console.log("Signup successful:", res.data);

    // Optional: Redirect or show message
    // navigate("/login");
  } catch (error) {
    console.error("Signup error:", error.response?.data?.error || error.message);
  }
};


  return (
    <motion.div
      className="w-screen h-screen flex items-center justify-center font-[Space Grotesk]"
      style={{
        background: 'linear-gradient(135deg, #f2f2f7, #e0e0e5)',
      }}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.2)] px-10 py-12 rounded-2xl w-[380px] flex flex-col gap-8 transition duration-300"
      >
        <h2 className="text-2xl font-semibold text-center text-[#1e1e1e] tracking-wide">
          Create Account
        </h2>

        <div className="flex flex-col gap-5">
          {[
            { name: 'fullname', placeholder: 'Full Name' },
            { name: 'username', placeholder: 'Username' },
            { name: 'password', placeholder: 'Password', type: 'password' },
            { name: 'confirmpassword', placeholder: 'Confirm Password', type: 'password' },
          ].map((field) => (
            <input
              key={field.name}
              type={field.type || 'text'}
              name={field.name}
              value={formdata[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
              className="bg-transparent border-b border-gray-400 focus:border-indigo-600 transition outline-none text-sm py-2 placeholder:text-gray-500"
            />
          ))}

          <select
            name="role"
            value={formdata.role}
            onChange={handleChange}
            className="bg-transparent border-b border-gray-400 focus:border-indigo-600 text-sm py-2 outline-none text-gray-700 placeholder:text-gray-500"
          >
            <option value="" disabled hidden>Select Role</option>
            <option value="renter">Renter</option>
            <option value="owner">Owner</option>
          </select>
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
  Sign Up
</button>



        <p className="text-sm text-center text-gray-600 mt-2">
          Already have an account?
          <Link to="/login" className="text-indigo-600 hover:underline ml-1 font-medium">
            Log In
          </Link>
        </p>
      </form>
    </motion.div>
  );
};

export default SignUpPage;
