import React from 'react';
import '@fontsource/space-grotesk';
import { UserCircle } from 'lucide-react'; // install with: npm install lucide-react

const navLinks = ['Home', 'Projects', 'Contact'];

const HomePage = () => {
  return (
    <div data-theme="nord" className="w-screen h-screen bg-base-100 text-base-content">
      {/* Navbar */}
      <div className="navbar px-6 shadow-md">
        {/* Left: App Name */}
        <div className="flex-1">
          <a className="text-2xl font-bold tracking-wide">Bhalo-Basha</a>
        </div>

        {/* Right: Nav Options */}
        <div className="flex-none space-x-6 hidden sm:flex items-center">
          {navLinks.map((link, index) => (
            <a
              key={index}
              className="relative text-sm font-medium hover:text-primary transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full after:origin-right hover:after:origin-left"
              href="#"
            >
              {link}
            </a>
          ))}

          {/* Profile Dropdown */}
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
      </div>

      {/* Body */}
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <h1 className="text-3xl font-bold">Welcome to Bhalo-Basha</h1>
      </div>
    </div>
  );
};

export default HomePage;
