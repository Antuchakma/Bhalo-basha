import React, { useState } from 'react';
import '@fontsource/space-grotesk';
import { UserCircle, Menu } from 'lucide-react';

const navLinks = ['Home', 'Projects', 'Contact'];

const HomePage = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div data-theme="nord" className="w-screen h-screen bg-base-100 text-base-content font-[Space Grotesk]">
      {/* Navbar */}
      <div className="navbar px-4 sm:px-6 shadow-md">
        {/* Left: Logo */}
        <div className="flex-1">
          <a className="text-xl sm:text-2xl font-bold tracking-wide">Bhalo-Basha</a>
        </div>

        {/* Right: Desktop Nav */}
        <div className="hidden sm:flex items-center space-x-6">
          {navLinks.map((link, index) => (
            <a
              key={index}
              className="relative text-sm font-medium hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:origin-right hover:after:origin-left"
              href="#"
            >
              {link}
            </a>
          ))}

          {/* Profile Button */}
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <UserCircle className="w-6 h-6" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-32"
            >
              <li>
                <a href="/login" className="text-sm font-medium">Login</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Menu Icon */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Mobile Nav Links */}
      {mobileOpen && (
        <div className="sm:hidden flex flex-col items-center space-y-3 mt-2">
          {navLinks.map((link, index) => (
            <a
              key={index}
              className="text-sm font-medium text-base-content hover:text-primary transition"
              href="#"
              onClick={() => setMobileOpen(false)}
            >
              {link}
            </a>
          ))}
          <a href="/login" className="text-sm font-medium" onClick={() => setMobileOpen(false)}>
            Login
          </a>
        </div>
      )}

      {/* Page Content */}
      <div className="flex items-center justify-center h-[calc(100vh-4rem)] px-4 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold">Welcome to Bhalo-Basha</h1>
      </div>
    </div>
  );
};

export default HomePage;
