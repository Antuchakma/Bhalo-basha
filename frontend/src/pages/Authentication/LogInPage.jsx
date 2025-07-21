import React, { useState } from 'react';
import { Link } from 'react-router';
import '@fontsource/space-grotesk'; // Run: npm i @fontsource/space-grotesk

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
    <div
      className="w-screen h-screen flex items-center justify-center font-[Space Grotesk]"
      style={{
        backgroundColor: '#121212',
        backgroundImage: `radial-gradient(circle at top left, #1e1e1e 0%, #121212 100%)`,
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#f2f3f5] text-[#1a1a1a] shadow-[0_8px_30px_rgba(0,0,0,0.25)] px-10 py-12 rounded-xl w-[360px] flex flex-col gap-7"
      >
        <h2 className="text-2xl font-semibold text-center tracking-wide">Welcome Back</h2>

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
          className="mt-2 bg-[#1f1f1f] hover:bg-[#2a2a2a] text-white py-2 rounded-md text-sm font-semibold shadow-md transition"
        >
          Log In
        </button>

        <p className="text-sm text-center text-gray-600 mt-2">
          Don’t have an account?
          <Link to="/signup" className="text-indigo-500 hover:underline ml-1 font-medium">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInPage;
